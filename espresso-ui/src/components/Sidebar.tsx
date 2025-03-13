'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FilePlus, List } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      title: 'Template List',
      path: '/template-list',
      icon: <List size={20} />
    },
    {
      title: 'Template Editor',
      path: '/create-template',
      icon: <FilePlus size={20} />
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      {/* Floating collapse button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none transition-transform"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      <div
        className={`border-r border-gray-200 h-full transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto pt-2">
            <nav>
              <ul className="space-y-1 px-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.title}>
                      <Link 
                        href={item.path}
                        className={`flex items-center p-3 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-red-100 text-red-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3 text-current">
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;