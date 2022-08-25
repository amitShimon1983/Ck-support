import React, { useRef, FunctionComponent, useEffect, useState } from 'react';
import { Editor } from 'ckeditor__ckeditor5-core';
import { ErrorState, LoadingMask, Spinner } from '@harmon.ie/collabria-frontend-storybook';
import { loadEditor, attachEvents } from './helper';
import { RichTextEditorProps } from './types';
import classes from './RichTextEditor.module.scss';
export const RichTextEditor: FunctionComponent<RichTextEditorProps> = ({
  disabled = false,
  configuration,
  data,
  events,
  styles,
  commentListId,
  editorId,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [editorRef, setEditorRef] = useState<Editor | undefined>(undefined);
  const domContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer;
    if (domContainer.current && !editorRef && !error) {
      timer = setTimeout(() => {
        (async () => {
          try {
            const editor = await loadEditor(domContainer?.current, configuration, commentListId, editorId);
            setEditorRef(editor);
            // if (disabled) {
            //   // editor.enableReadOnlyMode('true');
            // }

            attachEvents(editor, events);
          } catch (e: any) {
            setError(e);
          } finally {
            setLoading(false);
          }
        })();
      }, 700);
      return () => {
        timer && clearTimeout(timer);
      };
    }
  }, [domContainer, editorRef, configuration, error, disabled]);
  useEffect(() => {
    if (editorRef && data) {
      editorRef.editing.view.focus();
      editorRef.data.set(data);
    }
  }, [editorRef, data]);
  return (
    <div style={styles?.root}>
      <div id={editorId + 'presence-list-container'} />
      <div id={editorId + '_editor-container'}>
        <div id={editorId + 'container'} className="container">
          <div ref={domContainer} />
        </div>
      </div>
      <div id="revision-viewer-container">
        <div className="container">
          <div id="revision-viewer-editor" />
          <div className="sidebar" id="revision-viewer-sidebar" />
        </div>
      </div>
      {loading && (
        <div className={classes.spinner_container}>
          <Spinner label="loading..." />
        </div>
      )}
      {error && <ErrorState error={error} />}
    </div>
  );
};
