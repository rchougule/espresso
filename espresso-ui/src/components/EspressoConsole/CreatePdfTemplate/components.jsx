import { lazy } from 'react';

import { CREATE_TEMPLATE, NAME_TEMPLATE_MODAL, PREVIEW_PDF, PUBLISHED_TEMPLATE } from '../constants';

export const components = {
    // [NAME_TEMPLATE_MODAL]: lazy(
    //     () => import('@/components/EspressoConsole/CreatePdfTemplate/Components/NameTemplateModal'),
    // ),
    [CREATE_TEMPLATE]: lazy(
        () => import('@/components/EspressoConsole/CreatePdfTemplate/Components/EditTemplate'),
    ),
    [PREVIEW_PDF]: lazy(
        () => import('@/components/EspressoConsole/CreatePdfTemplate/Components/IframePreview'),
    ),
    [PUBLISHED_TEMPLATE]: lazy(
        () => import('@/components/EspressoConsole/CreatePdfTemplate/Components/PublishedTemplate'),
    ),
};
