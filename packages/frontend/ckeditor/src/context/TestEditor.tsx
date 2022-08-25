import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createContext, createContextEditor } from './createEditor';
import { Context } from './editor';
interface EditorTestProps {}

const EditorTest: FunctionComponent<EditorTestProps> = () => {
  const [editorsContext, setEitorContext] = useState<Context>();
  let editorRef = useRef<any>();
  useEffect(() => {
    createContext().then(data => setEitorContext(data));
  }, []);
  useEffect(() => {
    if (editorsContext && editorRef) {
      createContextEditor(editorsContext).then(data => (editorRef = data));
    }
  }, [editorsContext, editorRef]);
  return (
    <>
      {!!editorsContext && (
        <>
          <header>
            <div className="centered">
              <h1>
                <a href="https://ckeditor.com/ckeditor-5/" target="_blank" rel="noopener noreferrer">
                  <img src="https://c.cksource.com/a/1/logos/ckeditor5.svg" alt="CKEditor 5 logo" /> CKEditor 5
                </a>
              </h1>

              <nav>
                <ul>
                  <li>
                    <a href="https://ckeditor.com/collaboration/comments/" target="_blank" rel="noopener">
                      Website
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-outside-editor.html"
                      target="_blank"
                      rel="noopener"
                    >
                      Documentation
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <div className="message">
              <div className="centered">
                <h2>CKEditor 5 comments outside of editor non-RTC integration</h2>
              </div>
            </div>
            <div className="centered">
              <div className="row">
                <div className="main">
                  <div className="custom-targets-wrapper">
                    <p className="custom-target" id="comment-1" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                    <p className="custom-target" id="comment-2" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                    <p className="custom-target" id="comment-3" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                    <p className="custom-target" id="comment-4" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                    <p className="custom-target" id="comment-5" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                    <p className="custom-target" id="comment-6" tabIndex={-1}>
                      <button>Add comment</button>
                    </p>
                  </div>
                  <div className="editor-wrapper">
                    <div className="editor"></div>
                  </div>
                </div>
                <div className="sidebar"></div>
              </div>

              <div className="row row-info">
                See the editor data in the console -&nbsp;
                <button className="get-data">Get editor data</button>
              </div>

              <div className="row row-info">
                Your license key is stored in the local storage -&nbsp;
                <button className="remove-license-key">Reset license key</button>
              </div>
            </div>
          </main>
          <footer>
            <div className="centered">
              <p>
                <a href="https://ckeditor.com/ckeditor-5/" target="_blank" rel="noopener">
                  CKEditor 5
                </a>{' '}
                – Rich text editor of tomorrow, available today
              </p>
              <p>
                Copyright © 2003-2022,{' '}
                <a href="https://cksource.com/" target="_blank" rel="noopener">
                  CKSource
                </a>{' '}
                – Holding sp. z o.o. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

export default EditorTest;
