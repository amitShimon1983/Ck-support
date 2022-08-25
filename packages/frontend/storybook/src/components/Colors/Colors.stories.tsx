import React from 'react';
import { Story } from '@storybook/react';
import { theme } from '@harmon.ie/collabria-frontend-shared';
import { Text } from '../Text';
import { Stack } from '../Stack';
import { Box } from '../Box';

const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

export const Template: Story<any> = (args: any) => {
  const {
    settings: {
      theme: { palette },
    },
  } = theme.getCustomizations();

  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ padding: 32 }}>
      <Stack
        wrap
        styles={{
          root: {
            height: 400,
          },
        }}
      >
        {Object.keys(palette).map((key: string) => (
          <Box bg={key}>
            <Text color="black" {...args} style={itemStyles}>
              {key}
            </Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default {
  title: 'Components/Colors',
  component: Text,
  parameters: {
    layout: 'padded',
    controls: { include: [] },
  },
  argTypes: {},
};
