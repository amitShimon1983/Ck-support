import React from 'react';
import { Story } from '@storybook/react';
import { Message } from '@harmon.ie/collabria-frontend-shared';
import { Stack } from '~/components';
import MessageCard from './MessageCard';

const generateMessage = (): Message => {
  return {
    subject: 'Help strengthen the security of your Google Account',
    isRead: false,
    sentDateTime: new Date(),
    bodyPreview:
      "You don't often get email from no-reply@accounts.google.com. Learn why this is important\n" +
      '\n' +
      'Do you still want 052-374-8558 to be your recovery phone?\n' +
      'yairov@harmon.ie\n' +
      'Google can use this phone number to contact you if you need help signing in or if we n',
    sender: {
      emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
    },
  };
};

export const Template: Story<any> = (args: any) => {
  const message = generateMessage();
  return (
    <Stack tokens={{ childrenGap: 20 }} style={{ width: '320px' }}>
      <MessageCard message={message} />
    </Stack>
  );
};

export default {
  title: 'Components/MessageCard',
  component: MessageCard,
  parameters: {
    layout: 'padded',
  },
};
