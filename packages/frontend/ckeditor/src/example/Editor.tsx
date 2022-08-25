import React, { useCallback, useState } from 'react';
import times from 'lodash/times';
import { Box, Button, Stack } from '@harmon.ie/collabria-frontend-storybook';
import { CommentData, ThreadData } from '../types';
import { RichTextEditor } from '../RichTextEditor';
import { createHtml, createThread } from './helper';
import { configuration } from './config';

// const data = times(1)
//   .map(index => createHtml(index))
//   .join('');

const Editor = ({ data }: { data: any }) => {
  const [editorRef, setEditorRef] = useState<any>();
  const [commentsRepositoryRef, setCommentsRepository] = useState<any>();
  const [index, setIndex] = useState<number>(0);

  const onAddCommentThread = useCallback(async (threadData: ThreadData) => {
    console.log('onAddCommentThread', { threadData });
    return Promise.resolve({
      createdAt: new Date(),
    });
  }, []);

  const onRemoveCommentThread = useCallback(async (threadData: ThreadData) => {
    console.log('onRemoveCommentThread', { threadData });
    return {};
  }, []);

  const onAddComment = useCallback(async (commentData: CommentData) => {
    console.log('onAddComment', { commentData });
    return {};
  }, []);

  const onUpdateComment = useCallback(async (commentData: CommentData) => {
    console.log('onUpdateComment', { commentData });
    return {};
  }, []);

  const onRemoveComment = useCallback(async (commentData: CommentData) => {
    console.log('onRemoveComment', { commentData });
  }, []);

  const onReady = useCallback(editor => {
    const commentsRepository = editor.plugins.get('CommentsRepository');
    setEditorRef(editor);
    setCommentsRepository(commentsRepository);

    const { collaboration } = configuration;

    const channelId = collaboration?.channelId || 'channelId';

    const annotationsUIs = editor.plugins.get('AnnotationsUIs');
    annotationsUIs.switchTo('wideSidebar');

    commentsRepository.on(`addCommentThread:${channelId}`, async (evt: any, threadData: ThreadData) => {
      await onAddCommentThread(threadData);
    });
    commentsRepository.on(`removeCommentThread:${channelId}`, async (evt: any, threadData: ThreadData) => {
      await onRemoveCommentThread(threadData);
    });

    commentsRepository.adapter = {
      addComment: onAddComment,
      updateComment: onUpdateComment,
      removeComment: onRemoveComment,
    };
  }, []);

  const onChange = useCallback((e, editor) => {
    console.log('onChange', { editorData: editor.data.get() });
  }, []);

  const onCreateNew = useCallback(() => {
    const newIndex = index + 1;
    const newData = editorRef.data.get() + createHtml(newIndex);
    const newThread = createThread(newIndex);

    setIndex(newIndex);
    commentsRepositoryRef.addCommentThread(newThread);
    editorRef.data.set(newData);
  }, [index, editorRef, commentsRepositoryRef]);

  const onCreate10New = useCallback(() => {
    for (let x = index + 1; x <= index + 10; x += 1) {
      const newIndex = x;
      const newData = editorRef.data.get() + createHtml(newIndex);
      const newThread = createThread(newIndex);

      setIndex(newIndex);
      commentsRepositoryRef.addCommentThread(newThread);
      editorRef.data.set(newData);
    }
  }, [index, editorRef, commentsRepositoryRef]);

  const navigateToThread = useCallback((index: number) => {
    const threadElement = document.querySelector(`[data-comment='thread-${index}']`) as HTMLSpanElement;
    const commentElement = document.querySelector(`[data-thread-id='thread-${index}']`) as HTMLSpanElement;
    threadElement?.scrollIntoView();
    commentElement?.scrollIntoView();
  }, []);

  return (
    <>
      <Stack horizontal tokens={{ childrenGap: 12 }}>
        <Stack.Item>
          <Button onClick={onCreateNew} size={10}>
            Create New
          </Button>
        </Stack.Item>
        <Stack.Item>
          <Button onClick={onCreate10New}>Create 10 New</Button>
        </Stack.Item>
        <Stack.Item>
          <Button onClick={() => navigateToThread(10)}>Navigate To Thread 10</Button>
        </Stack.Item>
      </Stack>
      <Box asColumn padding="xl,0" heigh="500px">
        <RichTextEditor
          id={'example'}
          disabled={true}
          configuration={configuration}
          data={data}
          styles={{
            root: {
              maxHeight: 500,
            },
          }}
          events={{
            onReady,
            onChange,
          }}
        />
      </Box>
    </>
  );
};

export default Editor;
