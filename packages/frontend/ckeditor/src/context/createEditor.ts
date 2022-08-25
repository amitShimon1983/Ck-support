import { ClassicEditorBase, Context } from './editor';

export const createContextEditor = async (context: any) => {
  //   const STORAGE_KEY = 'ckeditor-license-key';
  const initialData = `<h2>Comments outside of editor</h2><p>This feature enables adding comments on non-editor form fields. <comment-start name="thread-1"></comment-start>This particular sample<comment-end name="thread-1"></comment-end> implements <a href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-outside-editor.html">comments outside of editor</a> without real-time collaboration, however you can use it as a part of real-time collaborative solutions as well (as in the linked documentation).</p><p>If you would like to learn more about CKEditor's 5 collaboration features, go ahead and check the docs on:</p><ul><li><a href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments.html">Comments</a></li><li><a href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes.html">Track Changes</a></li><li><a href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration.html">Real-time Collaboration</a></li><li><a href="https://ckeditor.com/docs/ckeditor5/latest/features/revision-history/revision-history.html">Revision History</a></li></ul><p>If you are new to CKEditor 5 and just starting, you can check the guides on <a href="https://ckeditor.com/docs/ckeditor5/latest/builds/index.html">installation</a>. We also provide an extensive <a href="https://ckeditor.com/docs/ckeditor5/latest/api/index.html">API documentation</a> for the <a href="https://ckeditor.com/docs/ckeditor5/latest/framework/index.html">CKEditor 5 framework</a>.</p><blockquote><p>For the latest news on all of our products, don't forget to <a href="https://ckeditor.com/blog/">check our blog</a>!</p></blockquote>
				`;

  // Save the provided license key in the local storage.
  //   const licenseKey = window.localStorage.getItem(STORAGE_KEY) || window.prompt('Your license key');
  //   window.localStorage.setItem(STORAGE_KEY, licenseKey);

  // You can always remove the key using the button in the UI.
  //   document.querySelector('.remove-license-key').addEventListener('click', () => {
  //     window.localStorage.removeItem(STORAGE_KEY);
  //     window.location.reload();
  //   });

  // Create the context.

  //   window.context = context;

  // Initialize the editor
  const editor = await createEditor('editor', document.querySelector('.editor'), {
    context,
    initialData,
  });
  document?.querySelector?.('.get-data')?.addEventListener('click', () => {
    console.log(editor.getData());
  });
  return editor;
};
export const createContext = async () => {
  return await Context.create({
    licenseKey: '0C6S21EJxxtz2aRERAt7JUJUvG53eAus4fQI1HiUprM3H92bw+73+rKpQw==',
  });
};
async function createEditor(name, element, config) {
  // const classicEditor: any = ClassicEditorBase;
  const editor = await ClassicEditorBase.create(element, config);

  return editor;
}
