import { Editor } from '@ckeditor/ckeditor5-core';
import { CSSProperties } from 'react';

export interface EditorEvents {
  onReady?: (editor: Editor) => any | void;
  onChange?: (event: any, editor: Editor) => any | void;
  onFocus?: (event: any, editor: Editor) => any | void;
  onBlur?: (event: any, editor: Editor) => any | void;
  onThreadRemove?: (editor: Editor, threadId: string) => any | void;
}

export interface RichTextEditorProps {
  data: string;
  disabled?: boolean;
  configuration: any;
  events?: EditorEvents;
  styles?: {
    root?: CSSProperties | undefined;
  };
  commentListId: string;
  editorId: string;
}

export type ThreadData = {
  channelId?: string;
  threadId: string;
  comments: CommentData[];
  target?: any;
  isFromAdapter?: boolean;
};

export type CommentData = {
  commentId: string;
  authorId: string;
  content: any;
  createdAt?: Date;
  channelId?: string;
  threadId?: string;
  isFromAdapter?: boolean;
  attributes?: any;
};
