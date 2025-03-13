import { cn } from '@/utils';
import { formConfig } from './formConfig';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

function NameTemplateModal({ formControls, handleMetaFormSubmit, className }) {
    const { control, register, handleSubmit, formState: { errors, touchedFields } } = useForm({
        defaultValues: {
            template_name: formControls?.initialValues?.templateName || '',
        },
        mode: 'onChange'
    });
    
    const [focusedField, setFocusedField] = useState(null);

    const onSubmit = (data) => {
        handleMetaFormSubmit(data);
    };

    const getInputClasses = (fieldId) => {
        const baseClasses = "mt-1 block w-full rounded-md border shadow-sm transition-all duration-200 focus:outline-none sm:text-sm px-3 py-2";
        const errorClasses = errors[fieldId] ? 
            "border-red-500 focus:border-red-500 focus:ring-red-500" : 
            "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
        const focusClasses = focusedField === fieldId ? "ring-2 ring-opacity-50" : "";
        
        return `${baseClasses} ${errorClasses} ${focusClasses}`;
    };

    return (
        <div className={cn('mr-4 mt-4 flex w-full min-w-full flex-grow', className)}>
            <div className="w-full rounded-lg bg-white sm:bottom-1/2 sm:right-1/2 sm:rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Template Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {formConfig.map((field) => (
                        <div key={field.id} className={field.className || "mb-5"}>
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.rules?.required && <span className="text-red-500">*</span>}
                            </label>
                            
                            {field.type === "InputBox" && (
                                <div className="relative">
                                    <input
                                        id={field.id}
                                        type="text"
                                        {...register(field.id, { required: field.rules?.required })}
                                        defaultValue={field.defaultValue || ''}
                                        className={getInputClasses(field.id)}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        onFocus={() => setFocusedField(field.id)}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {errors[field.id] && touchedFields[field.id] && (
                                        <div className="absolute right-2 top-2 text-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {field.type === "Dropdown" && (
                                <div className="relative">
                                    <Controller
                                        name={field.id}
                                        control={control}
                                        rules={{ required: field.rules?.required }}
                                        render={({ field: controlField }) => (
                                            <select
                                                id={field.id}
                                                {...controlField}
                                                className={getInputClasses(field.id) + " appearance-none pr-8"}
                                                onFocus={() => setFocusedField(field.id)}
                                                onBlur={() => setFocusedField(null)}
                                            >
                                                <option value="">Select {field.label}</option>
                                                {field.staticOptions?.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                            
                            {errors[field.id] && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center">
                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {typeof errors[field.id].message === 'string' 
                                        ? errors[field.id].message 
                                        : field.rules?.required}
                                </p>
                            )}
                        </div>
                    ))}
                    
                    {/* Hidden submit button - form will be submitted by footer buttons */}
                    <button type="submit" className="hidden">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NameTemplateModal;