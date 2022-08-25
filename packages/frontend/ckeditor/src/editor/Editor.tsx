import React, { useCallback, useState, useEffect, useRef } from 'react';
import { CommentData, ThreadData } from '../types';
import { RichTextEditor } from '../RichTextEditor';
import { configuration } from './config';
import classes from './Editor.module.scss';
import { gql, useMutation } from '@harmon.ie/collabria-frontend-shared';
import { Context } from '../plugins';
const UPDATE_SHARED_EMAIL = gql`
  mutation UpdateSharedEmail(
    $action: Action
    $editedContent: String
    $messageObjectId: String
    $sharedEmailObjectId: String
    $comment: CommentInput
  ) {
    updateSharedEmail(
      args: {
        action: $action
        editedContent: $editedContent
        messageObjectId: $messageObjectId
        sharedEmailObjectId: $sharedEmailObjectId
        comment: $comment
      }
    ) {
      _id
      commentThreads {
        threadId
        authorId
        comments {
          channelId
          threadId
          commentId
          content
          authorId
          createdAt
        }
      }
    }
  }
`;

const Editor = ({
  sharedEmail,
  messageObjectId,
  data,
  editorId,
  commentListId,
  commentThreads,
  authorId,
  members,
  context,
}: {
  sharedEmail: string;
  authorId: string;
  messageObjectId: string;
  data: any;
  commentListId: string;
  editorId: string;
  commentThreads: any[];
  members: { name: string; id: string }[];
  context?: Context;
}) => {
  const [updateSharedEmail, { called, loading }] = useMutation(UPDATE_SHARED_EMAIL);
  const [editorRef, setEditorRef] = useState<any>();
  const [commentsRepositoryRef, setCommentsRepository] = useState<any>();
  const [commentToSave, setCommentToSave] = useState<any>();
  useEffect(() => {
    if (!!commentToSave && !!editorRef?.data?.get()) {
      (async () => {
        const variables = { ...commentToSave, editedContent: editorRef.data.get() };
        const { data, errors } = await updateSharedEmail({
          variables,
        });
        if (!!data.updateSharedEmail && !errors) {
          setCommentToSave(undefined);
        }
      })();
    }
  }, [commentToSave]);
  const onAddCommentThread = async (threadData: ThreadData) => {
    console.log('onAddCommentThread', { threadData });
    return Promise.resolve({
      createdAt: new Date(),
    });
  };

  const onRemoveCommentThread = async (threadData: ThreadData) => {
    console.log('onRemoveCommentThread', { threadData });
    const { threadId } = threadData;
    const variables = {
      action: 'DELETE_THREAD',
      sharedEmailObjectId: sharedEmail,
      messageObjectId: messageObjectId,
      comment: { channelId: editorId, threadId, authorId },
    };
    // setCommentToSave(variables);
    return {};
  };

  const onAddComment = async (commentData: CommentData) => {
    console.log('onAddComment', { commentData });
    const { threadId, commentId, content } = commentData;
    const variables = {
      action: 'ADD_COMMENT',
      sharedEmailObjectId: sharedEmail,
      messageObjectId: messageObjectId,
      comment: { channelId: editorId, threadId, commentId, content, authorId },
    };
    setCommentToSave(variables);
    return {};
  };

  const onUpdateComment = async (commentData: CommentData) => {
    console.log('onUpdateComment', { commentData });
    const { threadId, commentId, content } = commentData;
    const variables = {
      action: 'EDIT_COMMENT',
      sharedEmailObjectId: sharedEmail,
      messageObjectId: messageObjectId,
      comment: { channelId: editorId, threadId, commentId, content, authorId },
    };
    // setCommentToSave(variables);
    return {};
  };

  const onRemoveComment = async (commentData: CommentData) => {
    console.log('onRemoveComment', { commentData });
    const { channelId, threadId, commentId, content } = commentData;
    const variables = {
      action: 'DELETE_COMMENT',
      sharedEmailObjectId: sharedEmail,
      messageObjectId: messageObjectId,
      comment: { channelId: editorId, threadId, commentId, content, authorId },
    };
    // setCommentToSave(variables);
  };
  const onThreadRemove = async (editor: any, threadId: string) => {
    const variables = {
      action: 'DELETE_THREAD',
      sharedEmailObjectId: sharedEmail,
      messageObjectId: messageObjectId,
      comment: { channelId: editorId, threadId, authorId },
    };
    // setCommentToSave(variables);
  };
  const onReady = editor => {
    const commentsRepository = editor.plugins.get('CommentsRepository');
    setEditorRef(editor);
    setCommentsRepository(commentsRepository);
    commentsRepository.on(`addCommentThread:${editorId}`, async (evt: any, threadData: ThreadData) => {
      await onAddCommentThread(threadData);
    });
    commentsRepository.on(`removeCommentThread:${editorId}`, async (evt: any, threadData: ThreadData) => {
      await onRemoveCommentThread(threadData);
    });

    commentsRepository.adapter = {
      addComment: onAddComment,
      updateComment: onUpdateComment,
      removeComment: onRemoveComment,
      removeCommentThread: onRemoveCommentThread,
    };
  };

  const onChange = async (e, editor) => {
    console.log('onChange: ', { e, data: editor.data.get() });
  };
  return (
    <>
      <div className={classes.container}>
        <RichTextEditor
          editorId={editorId}
          commentListId={commentListId}
          configuration={{
            context,
            ...configuration,
            collaboration: {
              channelId: editorId,
            },
            // }}
            // configuration={{
            //   context,
            //   ...configuration,
            comments: {
              // ...configuration.comments,
              editorConfig: {
                appData: {
                  editorId,
                  // userId: authorId,
                  // users: members,
                  // commentThreads: commentThreads,
                },
              },
              //   },
            },
          }}
          data={data}
          disabled
          styles={{}}
          events={{
            onReady,
            onChange,
            onThreadRemove,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
