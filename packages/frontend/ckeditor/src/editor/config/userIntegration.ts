import { Editor } from '@ckeditor/ckeditor5-core';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export class UsersIntegration extends Plugin {
  private readonly config: any;

  constructor(editor: Editor) {
    super(editor);

    debugger;
    this.config = this.editor.config.get('comments');
  }

  init() {
    console.log({ editor: this.editor });
    debugger;
    const usersPlugin = this.editor.plugins.get('Users') as any;
    const appData = this.config?.editorConfig?.appData;
    for (const user of appData.users) {
      //   usersPlugin.addUser(user);
      console.log({ user });
    }

    usersPlugin.defineMe(appData.userId);
  }
}
