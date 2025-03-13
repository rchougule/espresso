import React from 'react';

// import { cn } from '../../../utils';
import { cn } from '@/utils';
// import { ZIcon } from '../../atoms';
// import { Box } from '../../atoms';

const StepIcon = ({ state }) => {
    switch (state) {
        case 'completed':
            // return <ZIcon unicode="e80f" className="text-xs" />;
            return ``;
        default:
            return ``;
    }
};

export const Step = ({
    label,
    id,
    index,
    editable,
    isLastStep,
    state,
    onStepChange,
    onEditClick,
    labelClassName,
    disablePointer,
}) => {
    const isActive = state === 'active';
    const isCompleted = state === 'completed';
    const isDisabled = state === 'disabled';
    const handleStepChange = () => {
        onStepChange?.(id, index);
    };
    const handleEditClick = e => {
        e.stopPropagation();
        onEditClick?.(id);
    };
    return (
        <>
            <div
                className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-3xl border border-dashed border-black px-3 py-2',
                    {
                        'cursor-not-allowed': isDisabled || !isCompleted,
                        'border-solid': isCompleted || disablePointer,
                        'bg-black text-white': isActive,
                    },
                )}
                onClick={handleStepChange}
            >
                {isCompleted && (
                    <div
                        className={cn(
                            'flex h-5 min-w-5 max-w-5 items-center justify-center rounded-full border border-black',
                            {
                                'border border-solid border-blue-500 bg-blue-500 text-white ': isCompleted,
                            },
                        )}
                    >
                        <StepIcon state={state} index={index} />
                    </div>
                )}
                <div
                    className={cn('flex min-w-max items-center justify-center text-sm', {
                        'font-medium text-white': isActive,
                        'text-gray-400': isDisabled,
                    })}
                >
                    <p className={cn('text-sm', labelClassName)}>{label}</p>
                    {editable && (
                        <div className="flex p-2" onClick={handleEditClick}>
                            {/* <ZIcon unicode="E9F0" className="text-xs text-blue-500" /> */}
                        </div>
                    )}
                </div>
            </div>
            {!isLastStep && <hr className="min-w-10 max-w-96 flex-1 border-dashed border-black" />}
        </>
    );
};

const Stepper = ({ steps = [], className, labelClassName, onStepChange, onEditClick, disablePointer = false }) => {
    return (
        <div className={cn('flex items-center overflow-x-auto', className)}>
            {steps.map((step, index) => (
                <Step
                    key={index}
                    {...step}
                    isLastStep={steps.length - 1 === index}
                    index={index}
                    onStepChange={onStepChange}
                    onEditClick={onEditClick}
                    labelClassName={labelClassName}
                    disablePointer={disablePointer}
                />
            ))}
        </div>
    );
};

export default Stepper;
