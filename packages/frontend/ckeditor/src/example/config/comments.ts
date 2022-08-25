import times from 'lodash/times';
import { createThread } from '../helper';
import CustomCommentView from '../views/CustomCommentView';

const userId = 'user-1';
const users = [
  {
    id: 'user-1',
    name: 'Joe Doe',
    avatar: 'https://randomuser.me/api/portraits/thumb/men/26.jpg',
  },
  {
    id: 'user-2',
    name: 'Ella Harper',
    avatar: 'https://randomuser.me/api/portraits/thumb/women/65.jpg',
  },
];

const commentThreads = times(1).map(index => createThread(index));

export default {
  CommentView: CustomCommentView,
  maxCommentsWhenCollapsed: 3,
  maxCommentCharsWhenCollapsed: 100,
  maxThreadTotalWeight: 6000,
  editorConfig: {
    appData: {
      users,
      userId,
      commentThreads,
    },
  },
};
