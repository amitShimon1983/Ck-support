import { Editor } from '@ckeditor/ckeditor5-core';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export class CommentsIntegration extends Plugin {
  private readonly config: any;
  constructor(editor: Editor) {
    super(editor);

    this.config = this.editor.config.get('comments');
  }

  static get requires() {
    return ['CommentsRepository'];
  }

  init() {
    console.log({ editor: this.editor });
    const usersPlugin = this.editor.plugins.get('Users') as any;
    const commentsRepositoryPlugin = this.editor.plugins.get('CommentsRepository') as any;
    const appData = this.config?.editorConfig?.appData;

    if (!appData) {
      return;
    }

    for (const user of appData.users) {
      if (usersPlugin?.users?.find((usr: any) => usr.id === user.id)) {
        console.log('user exists in repo');
        continue;
      }
      usersPlugin.addUser(user);
    }
    usersPlugin?.me?.id !== appData.userId ? usersPlugin.defineMe(appData.userId) : {};

    for (const commentThread of appData.commentThreads) {
      if (commentThread.threadId === 'e1a9cef4689abdf8c105244c2608ee57e') {
        debugger;
      }
      if (commentThread.comments[0].channelId === appData.editorId) {
        commentsRepositoryPlugin.addCommentThread(commentThread);
      }
    }
  }
}
