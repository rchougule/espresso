import { cn } from '@/utils/index';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ open, setOpen, children, title, className, fullWidth = false }) => {
    const modalRef = useRef(null);

    const closeModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Add escape key handler
        const handleEscKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        if (open) {
            window.addEventListener('keydown', handleEscKey);
        }

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [open]);

    // Animation classes
    const modalAnimation = open ? 'animate-modalEntry' : '';
    const backdropAnimation = open ? 'animate-fadeIn' : '';

    return (
        open &&
        createPortal(
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className={clsx(
                    `fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4`,
                    modalAnimation
                )}
            >
                <div
                    className={clsx(
                        'relative z-50 mx-auto w-full rounded-lg bg-white shadow-xl sm:my-8',
                        fullWidth ? 'max-w-5xl' : 'max-w-md',
                        className
                    )}
                >
                    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-100">
                        {title && (
                            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                                <button
                                    onClick={closeModal}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Close modal"
                                >
                                    {/* Icon for close button */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        <div className="relative">
                            {!title && (
                                <button
                                    onClick={closeModal}
                                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Close modal"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                            
                            <div
                                className={cn(
                                    `overflow-y-auto p-6`,
                                    { 'w-full': fullWidth },
                                    { 'max-h-[calc(100vh-180px)]': fullWidth },
                                    { 'max-h-[calc(100vh-120px)]': !fullWidth }
                                )}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Backdrop with improved styling */}
                <div
                    className={clsx(
                        "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all",
                        backdropAnimation
                    )}
                    onClick={closeModal}
                    aria-hidden="true"
                ></div>
            </div>,
            document.body
        )
    );
};


export default Modal;