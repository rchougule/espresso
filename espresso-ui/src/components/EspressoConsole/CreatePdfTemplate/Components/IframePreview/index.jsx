import React from 'react';

import Spinner from "@/components/atoms/Spinner";
import { isEmpty } from '@/utils';

function IframePreview({ srcDoc = null, src = null, iframeRef, containerClassname, iframeClassname, loading }) {
    const iframeSrc = isEmpty(srcDoc) ? { src } : { srcDoc };
    return (
        <div className={containerClassname}>
            {loading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner size="xl" />
                </div>
            ) : (
                <iframe ref={iframeRef} {...iframeSrc} className={iframeClassname} />
            )}
        </div>
    );
}

export default IframePreview;
