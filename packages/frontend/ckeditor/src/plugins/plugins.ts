import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Comments from '@ckeditor/ckeditor5-comments/src/comments';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';

import CommentsOnly from '@ckeditor/ckeditor5-comments/src/commentsonly';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import StrikeThrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import ImageBlock from '@ckeditor/ckeditor5-image/src/imageblock';
import ImageInline from '@ckeditor/ckeditor5-image/src/imageinline';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
import ImageUtils from '@ckeditor/ckeditor5-image/src/imageutils';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoFormat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Enter from '@ckeditor/ckeditor5-enter/src/enter';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import IndentBlockCommand from '@ckeditor/ckeditor5-indent/src/indentblockcommand';
import IndentEditing from '@ckeditor/ckeditor5-indent/src/indentediting';
import IndentUI from '@ckeditor/ckeditor5-indent/src/indentui';
import LinkEditing from '@ckeditor/ckeditor5-link/src/linkediting';
import LinkUI from '@ckeditor/ckeditor5-link/src/linkui';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist';
import DocumentListProperties from '@ckeditor/ckeditor5-list/src/documentlistproperties';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import AutoSave from '@ckeditor/ckeditor5-autosave/src/autosave';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar';
// Context plugins:
import ContextBase from '@ckeditor/ckeditor5-core/src/context';
import CloudServicesCommentsAdapter from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments/cloudservicescommentsadapter';
import CommentsRepository from '@ckeditor/ckeditor5-comments/src/comments/commentsrepository';
import NarrowSidebar from '@ckeditor/ckeditor5-comments/src/annotations/narrowsidebar';
import WideSidebar from '@ckeditor/ckeditor5-comments/src/annotations/widesidebar';
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
import { CommentsIntegration } from '../integrations';
import { UsersIntegration } from '../editor/config/userIntegration';

export class Context extends ContextBase {}

// Plugins to include in the context.
Context.builtinPlugins = [
  // CloudServices,
  // CloudServicesCommentsAdapter,
  CommentsRepository,
  // NarrowSidebar,
  // PresenceList,
  // WideSidebar,
];
export const defaultConfig = {
  // The default configuration for the context plugins:
  sidebar: {
    container: document.getElementById('infinite-scroll'),
  },
  presenceList: {
    container: document.querySelector('#presence-list-container'),
  },
  // Configuration shared between the editors:
  language: 'en',
  toolbar: {
    items: ['bold', 'italic', '|', 'undo', 'redo', '|', 'comment', 'trackChanges'],
  },
  extraPlugins: [UsersIntegration, CommentsIntegration],
  comments: {
    editorConfig: {
      extraPlugins: [UsersIntegration, CommentsIntegration],
      plugins: [Essentials, Paragraph, Bold, Italic],
    },
  },
};
export {
  BalloonToolbar,
  Comments,
  Mention,
  Essentials,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CKBox,
  CKFinder,
  CloudServices,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  Table,
  TableToolbar,
  TextTransformation,
  GeneralHtmlSupport,
  HorizontalLine,
  PageBreak,
  ImageInsert,
  Highlight,
  Font,
  Code,
  StrikeThrough,
  Subscript,
  Superscript,
  Underline,
  ImageResize,
  AutoFormat,
  IndentBlock,
  IndentBlockCommand,
  LinkEditing,
  LinkUI,
  ListProperties,
  ListStyle,
  DocumentList,
  DocumentListProperties,
  AutoSave,
  Clipboard,
  Enter,
  Undo,
  ImageBlock,
  ImageUtils,
  ImageTextAlternative,
  ImageInline,
  Alignment,
  IndentEditing,
  IndentUI,
  CommentsOnly,
  FindAndReplace,
  RemoveFormat,
  // CommentsRepository,
  // Annotations,
  // PendingActions,
  // Users,
  // CommentsEditing,
  // CommentsUI,
  // EditorAnnotations,
  // WideSidebar,
  // Sidebar,
  // AnnotationsUIs,
  // NarrowSidebar,
  // InlineAnnotations,
  // ContextualBalloon,
  // ClipboardPipeline,
  // DragDrop,
  // Widget,
  // WidgetTypeAround,
  // Delete,
  // PastePlainText,
  // SelectAll,
  // SelectAllEditing,
  // SelectAllUI,
  // ShiftEnter,
  // Typing,
  // Input,
  // UndoEditing,
  // UndoUI,
  // BoldEditing,
  // BoldUI,
  // ItalicEditing,
  // ItalicUI,
  // ImageBlockEditing,
  // ImageEditing,
  // ImageTextAlternativeEditing,
  // ImageTextAlternativeUI,
  // ImageInlineEditing,
  // AlignmentEditing,
  // AlignmentUI,
  // Autoformat,
  // ListEditing,
  // ListUI,
};
