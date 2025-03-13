/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { PropTypes } from 'prop-types';

// import ZIcon from './../ZIcon/ZIcon';

/* 
    text-white bg-blue-500 border border-blue-500
    text-white !bg-gray-400 border !border-gray-400 hover:!bg-gray-400 cursor-not-allowed
    text-white bg-blue-400 border border-blue-400 hover:bg-blue-400
    border text-blue-500 border-blue-500
    text-gray-400 !bg-gray-100 border !border-gray-400 hover:!bg-gray-100
    text-blue-500 bg-blue-100 border border-blue-400 hover:bg-blue-100
    text-blue-500 bg-transparent
    text-gray-400
    text-white bg-blue-400 border border-blue-400
    */

const Button = ({
    variant = 'contained',
    size = 'md',
    disabled = false,
    text = 'Button',
    iconUnicode,
    iconPos = 'left',
    color = 'blue',
    block = false,
    isLoading = false,
    textLoading,
    onClick,
    className,
    contentAlign = 'center',
    ...restProps
}) => {
    const sizes = {
        sm: 'px-3 py-1 text-[10px]',
        md: 'px-3.5 py-2 text-xs',
        lg: 'px-4 py-2 text-sm',
        p0_sm: 'text-[10px]',
        p0_md: 'text-xs',
        p0_lg: 'text-sm',
    };

    const baseStyles = clsx({
        'flex items-center h-max gap-2 rounded-md font-normal': true,
        'justify-center': contentAlign === 'center',
        'justify-start': contentAlign === 'left',
        'justify-end': contentAlign === 'right',
    });

    let btnClassName = null,
        btnOutlineClassName = null;

    switch (color) {
        case 'red':
            btnClassName = 'hover:bg-red-600 border-red-500';
            break;
        case 'blue':
            btnClassName = 'hover:bg-blue-600 border-blue-500';
            break;
        case 'sky':
            btnClassName = 'hover:bg-sky-600 border-sky-500 bg-sky-500';
            break;
        case 'orange':
            btnClassName = 'hover:bg-[#FB5607] border-[#FB5607] bg-[#FB5607]';
            break;
        case 'green':
            btnClassName = 'hover:bg-green-50 border-green-500 bg-green-500';
            break;
        case 'black':
            btnClassName = 'hover:bg-[#282829] border-[#000] bg-[#000]';
    }

    switch (color) {
        case 'red':
            btnOutlineClassName = 'hover:bg-red-50 border-red-500';
            break;
        case 'blue':
            btnOutlineClassName = 'hover:bg-blue-50 border-blue-500';
            break;
        case 'sky':
            btnOutlineClassName = 'hover:bg-sky-50 border-sky-500';
            break;
        case 'orange':
            btnOutlineClassName = 'hover:bg-[#FB5607] border-[#FB5607]';
            break;
        case 'green':
            btnOutlineClassName = 'hover:bg-green-50 border-green-500';
            break;
        case 'black':
            btnOutlineClassName = 'hover:bg-[#282829] border-[#000]';
            break;
    }

    const variants = {
        contained: {
            mainStyles: `text-white bg-${color}-500 border border-${color}-500 ${btnClassName}`,
            disabledStyles: `text-white !bg-gray-400 border !border-gray-400 hover:!bg-gray-400 cursor-not-allowed	`,
            loadingStyles: `text-white bg-${color}-400 border border-${color}-400 hover:bg-${color}-400`,
        },
        outlined: {
            mainStyles: `border text-${color}-500 border-${color}-500 ${btnOutlineClassName}`,
            disabledStyles: `text-gray-400 !bg-gray-100 border !border-gray-400 hover:!bg-gray-100`,
            loadingStyles: `text-${color}-500 bg-${color}-100 border border-${color}-400 hover:bg-${color}-100`,
        },
        text: {
            mainStyles: `text-${color}-500 bg-transparent`,
            disabledStyles: `text-gray-400`,
            loadingStyles: `text-white bg-${color}-400 border border-${color}-400`,
        },
    };

    const dynamicClass = clsx(
        `${baseStyles} ${sizes[size]} ${isLoading ? variants[variant].disabledStyles : ''} ${
            disabled ? variants[variant].disabledStyles : variants[variant].mainStyles
        } ${block ? 'w-full' : 'w-max'} ${className ? className : ''} ${
            variant === 'outlined' && color === 'red' ? `!text-red-500` : ''
        } ${variant === 'contained' && color === 'red' ? 'bg-red-500' : ''} ? `,
    );

    const handleButtonClick = () => {
        if (!disabled && !isLoading && onClick) {
            onClick();
        }
    };

    return (
        <button className={dynamicClass} onClick={handleButtonClick} {...restProps}>
            {/* {iconUnicode && iconPos === 'left' && <ZIcon unicode={iconUnicode} />} */}
            {isLoading ? textLoading || text : text}
            {/* {iconUnicode && iconPos === 'right' && <ZIcon unicode={iconUnicode} />} */}
        </button>
    );
};

export default Button;

Button.propTypes = {
    variant: PropTypes.oneOf(['contained', 'text', 'outlined']),
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'p0_sm', 'p0_md', 'p0_lg']),
    disabled: PropTypes.bool,
    iconPos: PropTypes.oneOf(['left', 'right']),
    // color: PropTypes.oneOf(['blue', 'red', 'orange', 'sky']),
    block: PropTypes.bool,
    isLoading: PropTypes.bool,
};
