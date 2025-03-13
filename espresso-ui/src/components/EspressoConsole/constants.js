export const CREATE_TEMPLATE = 'CreateTemplate';
export const NAME_TEMPLATE_MODAL = 'NameTemplateModal';
export const PREVIEW_PDF = 'PreviewPdf';
export const PUBLISHED_TEMPLATE = 'PublishedTemplate';
export const TEMPLATE_ID_SEARCH_PARAM = 'template_id';
export const STATUS_FAILED = 'failed';

export const POPULDATE_HTML_TEMPLATE_WITH_JSON_REGEX = /\{\{\.(\w+(\.\w+)*)\}\}/g;

export const FOOTER_LABELS = ['Preview', 'Publish'];

export const DASHBOARD_CONFIG_CONSTANTS = {
    ID_HEADER: 'Template Id',
    NAME_HEADER: 'Template Name',
    // TENANT_HEADER: 'Tenant',
    CREATED_AT_HEADER: 'Created At',
    CREATED_BY_HEADER: 'Created By',
    UPDATED_AT_HEADER: 'Updated At',
    UPDATED_BY_HEADER: 'Updated By',
    HTML_TEMPLATE_HEADER: 'Html Template',
    JSON_HEADER: 'Json',
    STATUS_HEADER: 'Status',
    ACTIONS_HEADER: 'Actions',
    UPDATE_STATUS_HEADER: 'Update Status',
    ID_ACCESSOR: 'template_id',
    NAME_ACCESSOR: 'template_name',
    // TENANT_ACCESSOR: 'tenant',
    CREATED_AT_ACCESSOR: 'created_at',
    CREATED_BY_ACCESSOR: 'created_by',
    UPDATED_AT_ACCESSOR: 'updated_at',
    UPDATED_BY_ACCESSOR: 'updated_by',
    HTML_TEMPLATE_ACCESSOR: 'template_html',
    JSON_ACCESSOR: 'json',
    STATUS_ACCESSOR: 'status',
    ACTIONS_ACCESSOR: 'actions',
    UPDATE_STATUS_ACCESSOR: 'update_status',
};

export const STEPS = [
    {
        id: CREATE_TEMPLATE,
        label: 'Edit Template',
    },
    {
        id: PUBLISHED_TEMPLATE,
        label: 'Preview & Publish Template',
    },
];

export const EDITOR_OPTIONS = {
    scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden',
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0,
    },
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
};

export const EDITOR_TYPES = {
    HTML_EDITOR: 'html_editor',
    JSON_EDITOR: 'json_editor',
    GO_EDITOR: 'go_editor',
    PHP_EDITOR: 'php_editor',
    PYTHON_EDITOR: 'python_editor',
    COPY_EDITOR: 'copy_editor',
    JSON_EDITOR_READ_ONLY: 'json_editor_read_only',
};

export const LANGUAGE_OPTIONS = [
    {
        label: 'Golang',
        value: EDITOR_TYPES.GO_EDITOR,
    },
    {
        label: 'Python',
        value: EDITOR_TYPES.PYTHON_EDITOR,
    },
    {
        label: 'PHP',
        value: EDITOR_TYPES.PHP_EDITOR,
    },
    {
        label: 'JSON',
        value: EDITOR_TYPES.JSON_EDITOR_READ_ONLY,
    },
];

export const HTML_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>My First Webpage</title>
   </head>
   <body>
      <h1>{{.page_heading}}</h1>
      <hr />
      <div id="main" style="display:flex; justify-content:center; align-items:center; flex-direction:column;">
         <div class="svg-container" style="height:256px; width:256px; margin-top:24px;">
            <img src="{{.header_image}}" alt="rocket" />
         </div>
         <div id="instructions" style="background:#F5F5F5; padding:8px 16px; border-radius:8px;">
            <p>This is a live editor. Begin making changes to the HTML code on left to preview.</p>
            <ul>
               <li> Use the toggle button in the editor to switch to the json editor </li>
               <li>
                  To use the json variable in your html add the variable values wrapped in double curly braces followed by a '.' and your json your_key
                  <textarea disabled>
                        <h4>{{.your_key}}</h4>, 
                    <img src="{{.your_img_link_key}}" /> 
                    </textarea>
               </li>
               <li>
                  To use css in the editor add the styles using internal css i.e. using the
                  <textarea disabled>
 <style>...</style>
 </textarea>
                  tag internally in the head section
               </li>
               <li> To use a custom font please add the font link in the head section of the html using the link tag </li>
               <li> In JSON editor, add your key and its value as key pair, e.g.
                  <textarea disabled>
                  {
                  "your_key": "your_value"
                  }
                  </textarea>
               </li>
            </ul>
         </div>
      </div>
   </body>
</html>`;

export const DEFAULT_JSON = `{
   "page_heading": "Getting Started",
   "header_image": "https://b.zmtcdn.com/data/o2_assets/6a20174bed91e997b373130a5ac5e13e1739881110.png"
} 
`;

export const INTERVAL_TIME = 3000;
