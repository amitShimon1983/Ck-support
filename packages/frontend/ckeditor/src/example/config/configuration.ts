import { CommentsIntegration } from '../../integrations';
import plugins from './plugins';
import comments from './comments';
import toolbar from './toolbar';

const configuration = {
  licenseKey: '3JRca7IB0Z5mF8F2LYqIUkOUdc3dxuBwvYYtzhDV3KAGprAL0sn4AedHOg==',
  toolbar,
  plugins,
  balloonToolbar: ['bold', 'italic', '|', 'undo', 'redo'],
  comments,
  extraPlugins: [CommentsIntegration],
  removePlugins: ['Markdown'],
  collaboration: {
    channelId: 'channel-id',
  },
};

export default configuration;
