import React from 'react';
import ReactDOM from 'react-dom';
import CommentView from '@ckeditor/ckeditor5-comments/src/comments/ui/view/commentview';
import ReactCommentView from '../components/CustomPersona';

class CustomCommentView extends CommentView {
  getTemplate() {
    const templateDefinition = super.getTemplate();

    super.on('render', () => {
      const avatar = templateDefinition.children[0].children[0];
      // @ts-ignore
      ReactDOM.render(<ReactCommentView attributes={this._model.attributes} />, avatar.element);
    });

    return templateDefinition;
  }
}

export default CustomCommentView;
