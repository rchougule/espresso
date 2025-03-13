import React from 'react';

import { cn } from '@/utils/index';
import Button from '@/components/atoms/Button';

const Footer = ({
    onNext,
    onPrev,
    prevButtonProps = {},
    nextButtonProps = {},
    nextLabel = 'Continue',
    prevLabel = 'Back',
    hideNextButton = false,
    hidePrevButton = false,
    disableNextButton = false,
    disablePrevButton = false,
    className,
}) => {
    const handlePrev = () => {
        onPrev?.();
    };

    const handleNext = () => {
        onNext?.();
    };

    const btnContainerClass = cn({
        'justify-between': !(hideNextButton || hidePrevButton),
        'justify-end': (hideNextButton || hidePrevButton) && !hideNextButton,
        'justify-start': (hideNextButton || hidePrevButton) && hideNextButton,
    });

    return (
        <div className={cn('box-border flex w-full p-2', className)}>
            <div className={cn('flex w-full', btnContainerClass)}>
                {!hidePrevButton && (
                    <Button
                        size="lg"
                        variant="contained"
                        {...prevButtonProps}
                        onClick={handlePrev}
                        text={prevLabel}
                        disabled={disablePrevButton}
                        iconPos="left"
                        iconUnicode="e823"
                        color="black"
                    />
                )}
                {!hideNextButton && (
                    <Button
                        color="black"
                        size="lg"
                        variant="contained"
                        {...nextButtonProps}
                        disabled={disableNextButton}
                        onClick={handleNext}
                        iconPos="right"
                        text={nextLabel}
                        iconUnicode="e822"
                    />
                )}
            </div>
        </div>
    );
};

export default Footer;
