import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

export const isEmpty = val => {
    return val === undefined || val == null || val?.length <= 0 || Object.keys(val)?.length === 0 ? true : false;
};

export const scrollToError = (formControls, errors) => {
    const elements = (errors ?? Object.keys(formControls.formState.errors))
        .map(name => document.getElementsByName(name)[0] || document.getElementById(name))
        .filter(el => !!el);
    elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    if (elements.length > 0) {
        let errorElement = elements[0];
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus({ preventScroll: true });
    }
};


export const replaceContentWithRegex = (dataToReplace, replaceObject, regex) => {
    let data = '';

    if (isEmpty(replaceObject)) {
        return dataToReplace;
    }

    try {
        data = dataToReplace.replace(regex, (_, key) => {
            let keyArray = key.split('.');
            const value = getValueFromKeyArray(keyArray, replaceObject) || `{{.${key}}}`;
            if (typeof value === 'object') {
                return JSON.stringify(value);
            }
            return value;
        });
    } catch (e) {
        console.error('Error in replaceContentWithRegex', e);
    }

    return data;
};
