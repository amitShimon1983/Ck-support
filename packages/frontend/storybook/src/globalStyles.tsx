import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  * {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #ffffff;
  }

  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #E0E0E1;
  }
.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
  border: none;
}
.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
  border: none;
}
.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
  border: none;
  box-shadow: none;
}
[dir=ltr] .ck.ck-link-actions .ck-button:not(:first-child), [dir=rtl] .ck.ck-link-actions .ck-button:not(:last-child) {
    margin-left: var(--ck-spacing-standard);
    display: none;
}
.ck.ck-editor__main>.ck-editor__editable {
    min-height: 450px;
}
.ck.ck-editor__editable td .image-inline img, .ck.ck-editor__editable th .image-inline img {
   max-width: inherit;
 }
 /* .ck-comment__main .ck-annotation__main{
    width: 30%;
 } */
 .ck .ck-sticky-panel{
 display: none;
 }
 /* .ck-sidebar-item{
    width: 22%;
    right:20px;
 } */
  .container {
    position:relative;
    display: flex; /* Create a column layout. */
    /* position: relative; */
    width:98%;
    /* width: 1000px; Set some size for the whole editor + sidebar (can be any size). */
  }

  .container > .ck.ck-editor {
    width: 100%;  //Stretch the editable area.
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
  }

  /* .sidebar {
    border: 1px solid #c4c4c4;
    margin-left: -1px;
    background: #fafafa;
  } 

   #sidebar {
  
    width: 300px;
    max-height: 577px;
    padding: 0 10px;
    overflow: auto;
  } 
  */

  #revision-viewer-container {
    display: none; /* Revision history viewer is initially hidden. */
  }

  #revision-viewer-sidebar {
    /* min-width: 320px; 20px more than #sidebar due to paddings. */
  }
`;

export default () => <GlobalStyle />;
