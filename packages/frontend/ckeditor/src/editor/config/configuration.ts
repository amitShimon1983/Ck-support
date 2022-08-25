import { CommentsIntegration } from '../../integrations';
import plugins from './plugins';
import comments from './comments';
import { UsersIntegration } from './userIntegration';

const configuration = {
  licenseKey: '0C6S21EJxxtz2aRERAt7JUJUvG53eAus4fQI1HiUprM3H92bw+73+rKpQw==',
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  balloonToolbar: {
    items: ['comment'],
    shouldNotGroupWhenFull: true,
  },
  // comments,
  extraPlugins: [CommentsIntegration],
  plugins,
  removePlugins: ['Markdown'],
  collaboration: {
    channelId: 'channel-id',
  },
};

export default configuration;
