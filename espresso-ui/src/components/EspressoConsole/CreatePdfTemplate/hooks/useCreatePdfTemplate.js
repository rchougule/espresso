import { HTMLHint } from 'htmlhint';
import _, { isEmpty } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { createPdfTemplate, getTemplateById } from '../../apis';
import { DEFAULT_JSON, EDITOR_TYPES, HTML_BOILERPLATE, STEPS, TEMPLATE_ID_SEARCH_PARAM } from '../../constants';
import { getHtmlFromHtmlTemplate, jsonToGoMapInterface, jsonToPhpArray } from '../../helper';

export default function useCreatePdfTemplate() {
    const [loading, setLoading] = useState(true);
    const [htmlValue, setHtmlValue] = useState(HTML_BOILERPLATE);
    const [goValue, setGoValue] = useState(jsonToGoMapInterface(DEFAULT_JSON));
    const [phpValue, setPhpValue] = useState(jsonToPhpArray(DEFAULT_JSON));
    const [pythonValue, setPythonValue] = useState(DEFAULT_JSON);
    const [jsonValue, setJsonValue] = useState(JSON.stringify(DEFAULT_JSON, null, 4));
    const [iframeSrcDoc, setIframeSrcDoc] = useState(HTML_BOILERPLATE);
    const [editorType, setEditorType] = useState(EDITOR_TYPES.HTML_EDITOR);
    const [activeStep, setActiveStep] = useState(STEPS[0].id);
    const [typingInEditor, setTypingInEditor] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [postBackParams, setPostBackParams] = useState({});
    const [openPublishModal, setOpenPublishModal] = useState(false);
    const [publishingTemplate, setPublishingTemplate] = useState('');

    // const { pushError } = useErrorContext();
    const formControls = useForm({
        mode: 'onChange',
    });

    const iframeRef = useRef();

    const activeStepIndex = STEPS.findIndex(item => item.id === activeStep);

    const searchParams = useSearchParams();

    const renderIframe = (htmlValue, jsonValue) => {
        if (validateHtml(htmlValue) && validateJson(jsonValue)) {
            populateData(htmlValue, jsonValue);
            setDisableNextButton(false);
        } else {
            setDisableNextButton(true);
        }
        setTypingInEditor(false);
    };

    const debouncedPopulateIframe = useCallback(_.debounce(renderIframe, 750), []);

    useEffect(() => {
        if (searchParams.size === 0) {
            setHtmlValue(HTML_BOILERPLATE);
            setJsonValue(DEFAULT_JSON);
            formControls.reset();
            renderIframe(HTML_BOILERPLATE, DEFAULT_JSON);
        }
    }, [searchParams]);

    const getTemplateDataById = async template_id => {
        const { data, post_back_params, status } = await getTemplateById(template_id);
        if (status.status === 'error') {
            toast.error(status.message);
            return;
        }

        const { template_html, json = '{}', tenant, template_name } = data;
        setHtmlValue(template_html);
        setJsonValue(json);
        setPythonValue(json);
        setPhpValue(jsonToPhpArray(JSON.parse(json)));
        setGoValue(jsonToGoMapInterface(JSON.parse(json)));

        setPostBackParams(post_back_params);
        console.log('post_back_params', postBackParams);

        formControls.setValue('template_name', template_name);
        formControls.setValue('tenant', {
            label: tenant,
            value: tenant,
        });
        setLoading(false);
    };

    useEffect(() => {
        const template_id = searchParams.get(TEMPLATE_ID_SEARCH_PARAM);
        if (isEmpty(template_id)) {
            setLoading(false);
            return;
        }

        getTemplateDataById(template_id);
    }, []);

    const validateHtml = html => {
        const results = HTMLHint.verify(html);
        const errors = results.filter(result => result.type === 'error');
        if (errors.length === 0) return true;
        toast.error(
            errors
                .map(error => {
                    return `LINE ${error.line}: ` + error.message;
                })
                .join(', '),
        );
        return false;
    };

    const validateJson = json => {
        try {
            JSON.parse(json);
            return true;
        } catch (error) {
            toast.error('Invalid JSON: ' + error.message);
            return false;
        }
    };

    const handleEditorChange = value => {
        if (editorType !== EDITOR_TYPES.HTML_EDITOR) return;
        if (!typingInEditor) setTypingInEditor(true);
        setHtmlValue(value);
        debouncedPopulateIframe(value, jsonValue);
    };

    const handleJSONEditorChange = value => {
        if (!typingInEditor) setTypingInEditor(true);
        setJsonValue(value);
        if (validateJson(value)) {
            const phpValue = jsonToPhpArray(JSON.parse(value));
            const goValue = jsonToGoMapInterface(JSON.parse(value));
            setPythonValue(value);
            setPhpValue(phpValue);
            setGoValue(goValue);
            setPythonValue(pythonValue);
            debouncedPopulateIframe(htmlValue, value);
        } else {
            setDisableNextButton(true);
            setTypingInEditor(false);
        }
    };

    const onPrevButtonOnclick = () => {
        if (activeStepIndex - 1 >= 0) setActiveStep(STEPS[activeStepIndex - 1].id);
    };

    const generatePdf = async () => {
        const iframe = iframeRef.current;

        if (!iframe || !iframe.contentWindow) {
            alert('Cannot access iframe content due to cross-origin restrictions.');
            return;
        } else {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }
    };

    const populateData = useCallback((htmlValue, jsonValue) => {
        const data = JSON.parse(jsonValue);
        const populatedHtml = getHtmlFromHtmlTemplate(htmlValue, data);
        setIframeSrcDoc(populatedHtml);
    }, []);

    const publishTemplate = async () => {
        setPublishingTemplate(true);
        try {
            const body = {
                template_html: htmlValue,
                json: jsonValue,
                // tenant: formControls.getValues('tenant').value,
                // tenant: 'zomato',
                template_name: formControls.getValues('template_name'),
            };
            const { status } = await createPdfTemplate(body);
            if (status.status === 'success') {
                setActiveStep(STEPS[activeStepIndex + 1].id);
            } else {
                toast.error('Error updating template: ' + status.message);
            }
            setPublishingTemplate(false);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error publishing template', error);
            toast.error('Error publishing template: ' + error.message);
            setPublishingTemplate(false);
            return;
        }
    };

    const onNextButtonclick = () => {
        if (activeStepIndex === 0) {
            if (openPublishModal) {
                if (searchParams.size === 0) publishTemplate();
                return;
            }
            generatePdf();
            setOpenPublishModal(true);
            return;
        }

        // if (activeStepIndex === 0) {
        //     formControls?.handleSubmit(
        //         () => setActiveStep(STEPS[activeStepIndex + 1].id),
        //         () => scrollToError(formControls),
        //     )();
        //     if (validateHtml(htmlValue) && validateJson(jsonValue)) {
        //         populateData(htmlValue, jsonValue);
        //         setDisableNextButton(false);
        //     } else {
        //         setDisableNextButton(true);
        //     }
        //     return;
        // }

        if (activeStepIndex + 1 < STEPS.length) setActiveStep(STEPS[activeStepIndex + 1].id);
    };

    const getStepState = (id, index) => {
        if (id === activeStep) return 'active';
        if (index < activeStepIndex) return 'completed';
        return 'default';
    };

    const onStepChange = (id, index) => (index <= activeStepIndex ? setActiveStep(id) : null);

    const toggleSetOpenPublishModal = () => setOpenPublishModal(s => !s);

    return {
        editorType,
        htmlValue,
        iframeSrcDoc,
        jsonValue,
        goValue,
        phpValue,
        pythonValue,
        activeStep,
        typingInEditor,
        // pushError,
        formControls,
        iframeRef,
        activeStepIndex,
        disableNextButton,
        openPublishModal,
        loading,
        publishingTemplate,
        setEditorType,
        handleEditorChange,
        handleJSONEditorChange,
        onPrevButtonOnclick,
        generatePdf,
        populateData,
        onNextButtonclick,
        getStepState,
        onStepChange,
        toggleSetOpenPublishModal,
    };
}
