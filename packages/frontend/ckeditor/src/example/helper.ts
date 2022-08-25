import { ThreadData } from '../types';

export const createThread = (index: number): ThreadData => ({
  threadId: `thread-${index}`,
  comments: [
    {
      commentId: 'comment-1',
      authorId: 'user-1',
      content: `<p>Comment ${index}</p>`,
      createdAt: new Date('09/20/2018 14:21:53'),
      attributes: {
        emailAddress: 'yairov@harmon.ie',
      },
    },
    {
      commentId: 'comment-2',
      authorId: 'user-2',
      content: '<p>Why not?</p>',
      createdAt: new Date('09/21/2018 08:17:01'),
      attributes: {
        emailAddress: 'amits@harmon.ie',
      },
    },
  ],
});

export const createHtml = (index: number) => `
  <p>   
      <h2>
        <comment-start name="thread-${index}"></comment-start>
        Bilingual Personality Disorder - ${index}
        <comment-end name='thread-${index}'></comment-end>
      </h2>
      This shouldn’t come as a surprise
      <a href='https://en.wikipedia.org/wiki/Lateralization_of_brain_function'>since we already know</a>
      that different regions of the brain become more active depending on the activity.
      The structure, information and especially <strong>the culture</strong> of languages varies substantially
      and the language a person speaks is an essential element of daily life.
  </p>
`;
