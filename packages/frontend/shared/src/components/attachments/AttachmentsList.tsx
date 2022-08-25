import React from 'react';
import styled from 'styled-components';
import Attachment from './Attachment';

const Root = styled.div<{ isWrap?: boolean; isMobile: boolean }>`
  display: flex;
  align-items: center;
  overflow-y: scroll;
  scroll-behavior: smooth;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 0.5vh;
`;

const AttachmentsList = ({
  className,
  attachments = [],
  maxLength = 2,
  emailId,
  fontSize = 'medium',
  width = '120px',
  isMobile,
}: {
  attachments?: Array<any>;
  className?: string;
  maxLength?: number;
  fontSize?: 'small' | 'medium' | 'large';
  width?: '200px' | '120px' | '25%' | '22%';
  emailId?: string;
  isMobile: boolean;
}) => {
  return (
    <Root isMobile={isMobile} className={className} isWrap={!Number.isFinite(maxLength)}>
      {attachments.slice(0, maxLength).map(attachment => (
        <Attachment
          width={width}
          attachment={attachment}
          key={attachment.id}
          emailId={emailId}
          fontSize={fontSize}
          isMobile={true}
        />
      ))}
      {attachments.length > maxLength && `+ ${attachments.length - maxLength}`}
    </Root>
  );
};

export default AttachmentsList;
