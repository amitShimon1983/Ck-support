import { CommentsIntegration } from '../integrations';
import { Context, defaultConfig } from '../plugins';
import { UsersIntegration } from './config/userIntegration';
const channelId = 'channel-id';
const contextConfiguration = {
  licenseKey: '3JRca7IB0Z5mF8F2LYqIUkOUdc3dxuBwvYYtzhDV3KAGprAL0sn4AedHOg==',
  //   cloudServices: {
  //     // PROVIDE CORRECT VALUES HERE:
  //     tokenUrl: 'https://example.com/cs-token-endpoint',
  //     uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/',
  //     webSocketUrl: 'your-organization-id.cke-cs.com/ws/',
  //   },
  extraPlugins: [UsersIntegration, CommentsIntegration],
  collaboration: {
    channelId,
  },
};

export const createContext = async (comments: any, authorId: string, members: any[], commentThreads: any[]) => {
  return await Context.create({
    ...defaultConfig,
    ...contextConfiguration,
    comments: {
      ...comments,
      editorConfig: {
        appData: {
          userId: authorId,
          users: members,
          commentThreads: commentThreads,
        },
      },
    },
  });
};
