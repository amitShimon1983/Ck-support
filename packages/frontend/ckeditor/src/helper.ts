import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { EditorEvents } from './types';

export const loadEditor = async (
  element: HTMLDivElement | null,
  editorConfiguration: any,
  commentListId: string,
  editorId: string
) => {
  // const toolbarElem = document.getElementById(commentListId);
  const editorElem = document.getElementById(editorId + '_editor-container');
  editorConfiguration.collaboration = {
    channelId: editorId,
  };
  return await ClassicEditor.create(element, {
    ...editorConfiguration,
    commentsOnly: true,
    // revisionHistory: {
    //   editorContainer: editorElem,
    //   viewerContainer: document.querySelector('#revision-viewer-container'),
    //   viewerEditorElement: document.querySelector('#revision-viewer-editor'),
    //   viewerSidebarContainer: document.querySelector('#revision-viewer-sidebar'),
    // },
    // sidebar: {
    //   container: toolbarElem,
    // },
    // presenceList: {
    //   container: document.querySelector('#presence-list-container'),
    // },
  });
};

export const attachEvents = (editor: any, events?: EditorEvents) => {
  const { onChange, onFocus, onReady, onBlur, onThreadRemove } = events || {};
  const modelDocument = editor.model.document;
  const viewDocument = editor.editing.view.document;
  // editor.model.markers.on('update:comment', (evt, marker, oldRange, newRange) => {
  //   if (!newRange) {
  //     const threadId = marker.name.split(':')[1];
  //     console.log(`The comment thread with ID ${threadId} has been removed.`);
  //     if (typeof onThreadRemove === 'function') {
  //       onThreadRemove(editor, threadId);
  //     }
  //   }
  // });
  modelDocument.on('change:data', (event: any) => {
    if (onChange) {
      onChange(event, editor);
    }
  });

  viewDocument.on('focus', (event: any) => {
    onFocus && onFocus(event, editor);
  });

  viewDocument.on('blur', (event: any) => {
    onBlur && onBlur(event, editor);
  });

  // setTimeout(() => {
  onReady && onReady(editor);
  // });
};
