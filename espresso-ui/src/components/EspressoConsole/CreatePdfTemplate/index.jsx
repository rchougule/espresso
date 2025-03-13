// import '../../../../index.css';
// import { Spinner } from '../../../atoms';
// import { Stepper } from '../../../molecules';
import Footer from '@/components/molecules/Footer';

import Stepper from "@/components/molecules/Stepper";

import Spinner from "@/components/atoms/Spinner";
import { CREATE_TEMPLATE, FOOTER_LABELS, NAME_TEMPLATE_MODAL, STEPS } from '../constants';
import { components } from './components';
import useCreatePdfTemplate from './hooks/useCreatePdfTemplate';

function CreatePdfTemplate() {
    const {
        editorType,
        htmlValue,
        iframeSrcDoc,
        jsonValue,
        goValue,
        phpValue,
        activeStep,
        typingInEditor,
        formControls,
        iframeRef,
        activeStepIndex,
        disableNextButton,
        openPublishModal,
        loading,
        publishingTemplate,
        handlePhpEditorChange,
        handleEditorChange,
        setEditorType,
        handleJSONEditorChange,
        handleGoEditorChange,
        onPrevButtonOnclick,
        onNextButtonclick,
        getStepState,
        onStepChange,
        toggleSetOpenPublishModal,
    } = useCreatePdfTemplate();

    const Component = components[activeStep];

    const componentProps = {
        // [NAME_TEMPLATE_MODAL]: {
        //     formControls,
        //     submitText: FOOTER_LABELS[activeStepIndex],
        //     handleMetaFormSubmit: onNextButtonclick,
        //     className: 'px-6 py-2', 
        // },
        [CREATE_TEMPLATE]: {
            formControls,
            editorType,
            setEditorType,
            htmlValue,
            handleEditorChange,
            jsonValue,
            goValue,
            phpValue,
            handlePhpEditorChange,
            handleJSONEditorChange,
            handleGoEditorChange,
            iframeSrcDoc,
            iframeRef,
            typingInEditor,
            errorInSyntax: disableNextButton,
            openPublishModal,
            publishingTemplate,
            toggleSetOpenPublishModal,
            onNextButtonclick,
        },
    };

    const stepprtProps = {
        steps: STEPS.map((item, index) => ({
            ...item,
            state: getStepState(item.id, index),
        })),
        onStepChange,
    };

    return loading ? (
        <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
            <Spinner size="xl" />{' '}
        </div>
    ) : (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-center border-b border-b-gray-200 py-3">
                <Stepper {...stepprtProps} />
            </div>
            <div className="flex h-full max-h-full flex-1 flex-col overflow-y-auto">
                <Component {...componentProps[activeStep]} />
            </div>
            {activeStepIndex + 1 < STEPS.length && (
                <Footer
                    hidePrevButton={activeStepIndex === 0}
                    nextLabel={FOOTER_LABELS[activeStepIndex]}
                    onPrev={onPrevButtonOnclick}
                    onNext={onNextButtonclick}
                    className="border-t border-t-gray-200"
                    disableNextButton={disableNextButton || typingInEditor}
                />
            )}
        </div>
    );
}

export default CreatePdfTemplate;
