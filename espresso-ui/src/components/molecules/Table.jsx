import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, RefreshCw } from 'lucide-react';

const Table = ({
  initialData = [],
  columns = [],
  actions = null,
  searchPlaceholder = "Search...",
  hiddenColumns = [],
  paginationType = "default",
  isFetching = false,
  showRefreshButton = true,
  onRefresh = null,
}) => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter(row => {
      return columns.some(column => {
        if (hiddenColumns.includes(column.accessorKey)) return false;
        
        const cellValue = row[column.accessorKey];
        if (!cellValue) return false;
        
        return cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, columns, hiddenColumns]);

  // Sort data based on current sort config
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      
      if (valueA === valueB) return 0;
      
      if (sortConfig.direction === 'ascending') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [filteredData, sortConfig]);

  // Get paginated data
  const paginatedData = React.useMemo(() => {
    if (!paginationType) return sortedData;
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, paginationType]);

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle refresh button click
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Render the sort indicator
  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-30" />;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="h-4 w-4" /> 
      : <ChevronDown className="h-4 w-4" />;
  };

  // Render table pagination
  const renderPagination = () => {
    // Pagination code unchanged - keeping it for reference
    // ...
  };

  // Handle custom action cell rendering - FIXED FUNCTION
  const renderCell = (row, column) => {
    // Case 1: Column has a custom cell renderer defined as a function
    if (column.cell && typeof column.cell === 'function') {
      return column.cell(row);
    }
    
    // Case 2: Column has a custom openModal action
    if (column.accessorKey === 'actions' && column.openModal && typeof column.openModal === 'function') {
      return (
        <div className="flex space-x-2">
          <button 
            onClick={() => column.openModal(row.template_id)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Preview
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            onClick={() => {
              if (column.onEdit && typeof column.onEdit === 'function') {
                column.onEdit(row.template_id);
              }
            }}
          >
            Edit
          </button>
        </div>
      );
    }
    
    // Case 3: Status columns get special styling
    if (column.accessorKey === 'status') {
      const status = row[column.accessorKey];
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      );
    }
    
    // Case 4: Date formatting
    if (column.type === 'date' && row[column.accessorKey]) {
      try {
        const date = new Date(row[column.accessorKey]);
        return date.toLocaleDateString();
      } catch (e) {
        return row[column.accessorKey];
      }
    }
    
    // Default case: Just return the raw cell value
    return row[column.accessorKey];
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex space-x-2">
          {showRefreshButton && (
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          )}
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            {isFetching ? (
              <div className="flex items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
                <span className="ml-3 text-gray-500">Loading data...</span>
              </div>
            ) : paginatedData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p>No data found</p>
                {searchQuery && (
                  <p className="mt-1 text-sm">Try adjusting your search query</p>
                )}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map(column => {
                      if (hiddenColumns.includes(column.accessorKey)) return null;
                      
                      return (
                        <th
                          key={column.accessorKey}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(column.accessorKey)}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{column.header}</span>
                            {renderSortIndicator(column.accessorKey)}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {columns.map(column => {
                        if (hiddenColumns.includes(column.accessorKey)) return null;
                        
                        return (
                          <td 
                            key={`${rowIndex}-${column.accessorKey}`} 
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {renderCell(row, column)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {renderPagination()}
    </div>
  );
};

export default Table;