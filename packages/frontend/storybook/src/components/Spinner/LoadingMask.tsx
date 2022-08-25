import React from 'react';
import { ISpinnerProps } from '@fluentui/react';
import { Stack } from '../Stack';
import { Spinner } from '../Spinner';

const LoadingMask = ({ label = 'Loading...' }: ISpinnerProps) => {
  return (
    <Stack verticalFill horizontalAlign="center" verticalAlign="center" style={{ width: '100%' }}>
      <Stack.Item align="center">
        <Spinner label={label} />
      </Stack.Item>
    </Stack>
  );
};

export default LoadingMask;
