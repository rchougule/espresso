import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  tenant: string;
}

const TemplateDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tenant: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Steps */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between relative">
          {/* Progress Steps */}
          <div className="flex items-center w-full justify-between">
            {/* Step 1 */}
            {/* <div className="flex items-center">
              <div className="bg-black text-white rounded-full px-4 py-2 font-medium">
                Enter template details
              </div>
            </div> */}

            {/* Dotted line connector 1 */}
            <div className="flex-grow border-t border-dashed border-gray-400 mx-4"></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="border border-dashed border-gray-400 rounded-full px-4 py-2 text-gray-500 font-medium">
                Edit Template
              </div>
            </div>

            {/* Dotted line connector 2 */}
            <div className="flex-grow border-t border-dashed border-gray-400 mx-4"></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="border border-dashed border-gray-400 rounded-full px-4 py-2 text-gray-500 font-medium">
                Preview & Publish Template
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form>
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tenant Field */}
          <div className="mb-6">
            <label htmlFor="tenant" className="block text-gray-600 mb-2">
              Tenant <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="tenant"
                name="tenant"
                className="w-full px-4 py-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="tenant1">Tenant 1</option>
                <option value="tenant2">Tenant 2</option>
                <option value="tenant3">Tenant 3</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            type="button"
            className="flex items-center text-gray-500 hover:text-gray-700 px-4 py-2 rounded"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back
          </button>
          <button
            type="button"
            className="bg-black text-white px-6 py-2 rounded flex items-center font-medium hover:bg-gray-800"
          >
            Edit Template
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsForm;