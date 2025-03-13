import Modal from '@/components/molecules/Modal';
import EditorTab from '@/components/molecules/EditorTab';
import { Editor } from '@monaco-editor/react';

// import { Button } from '../../../../../atoms';
import Button from "@/components/atoms/Button";
import { DEFAULT_JSON, EDITOR_OPTIONS, EDITOR_TYPES, HTML_BOILERPLATE } from '../../../constants';
import { jsonToGo, jsonToPhpArray } from '../../../helper';
import IframePreview from '../IframePreview';
import { cn } from '@/utils';

function EditTemplate({
    formControls,
    iframeSrcDoc,
    iframeRef,
    htmlValue,
    jsonValue,
    phpValue,
    goValue,
    handleEditorChange,
    handleJSONEditorChange,
    typingInEditor,
    errorInSyntax,
    openPublishModal,
    publishingTemplate,
    toggleSetOpenPublishModal,
    onNextButtonclick,
    editorType,
    setEditorType,
}) {
    const editorProps = {
        [EDITOR_TYPES.HTML_EDITOR]: {
            language: 'html',
            value: htmlValue,
            defaultValue: HTML_BOILERPLATE,
            onChange: handleEditorChange,
            theme: 'light',
            options: EDITOR_OPTIONS,
        },
        [EDITOR_TYPES.JSON_EDITOR]: {
            language: 'json',
            defaultValue: DEFAULT_JSON,
            value: jsonValue,
            onChange: handleJSONEditorChange,
            theme: 'light',
            options: { ...EDITOR_OPTIONS },
        },
        [EDITOR_TYPES.GO_EDITOR]: {
            language: 'go',
            defaultValue: jsonToGo(JSON.parse(DEFAULT_JSON)),
            onChange: () => {},
            value: goValue,
            theme: 'light',
            options: { ...EDITOR_OPTIONS, readOnly: true },
        },
        [EDITOR_TYPES.PYTHON_EDITOR]: {
            language: 'python',
            defaultValue: DEFAULT_JSON,
            value: jsonValue,
            theme: 'light',
            options: { ...EDITOR_OPTIONS, readOnly: true },
        },
        [EDITOR_TYPES.PHP_EDITOR]: {
            language: 'php',
            defaultValue: jsonToPhpArray(JSON.parse(DEFAULT_JSON)),
            value: phpValue,
            onChange: () => {},
            theme: 'light',
            options: { ...EDITOR_OPTIONS, readOnly: true },
        },
        [EDITOR_TYPES.JSON_EDITOR_READ_ONLY]: {
            language: 'json',
            defaultValue: DEFAULT_JSON,
            value: jsonValue,
            onChange: handleJSONEditorChange,
            theme: 'light',
            options: { ...EDITOR_OPTIONS, readOnly: true },
        },
    };

    return (
        <div className={cn('my-2  grid flex-grow grid-cols-2 gap-1 px-4')}>
            <div className={cn('relative border border-black', { 'border-red-500': errorInSyntax })}>
                <Editor {...editorProps[editorType]} className="pt-12" key={editorType} />
                <EditorTab formControls={formControls} editorProps={editorProps} editorType={editorType} setEditorType={setEditorType} />
            </div>
            <IframePreview
                srcDoc={errorInSyntax ? null : iframeSrcDoc}
                iframeRef={errorInSyntax ? null : iframeRef}
                containerClassname="border border-black"
                iframeClassname="h-full w-full border-none"
                loading={typingInEditor}
            />
            <Modal title="Publish Template" open={openPublishModal} setOpen={toggleSetOpenPublishModal}>
                <div>
                    <p className="m-12 text-center">Do you want to Publish this Template?</p>
                    <div className="grid grid-cols-2 gap-1 border-t border-gray-200 p-1">
                        <Button
                            block
                            text="Go Back"
                            variant="outlined"
                            color="red"
                            onClick={toggleSetOpenPublishModal}
                        />
                        <Button
                            block
                            text="Publish"
                            variant="outlined"
                            color="green"
                            onClick={onNextButtonclick}
                            isLoading={publishingTemplate}
                            disabled={publishingTemplate}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditTemplate;
