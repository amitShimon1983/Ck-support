import React, { useCallback } from 'react';
import Highlighter from 'react-highlighter';
import { useProfilePicture, utils } from '@harmon.ie/collabria-frontend-shared';
import { SharedEmail } from '@harmon.ie/collabria-frontend-shared';
import { PersonaSize } from '@fluentui/react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Persona } from '../Persona';
import { Tooltip } from '../Tooltip';
import { Text } from '../Text';

const Root = styled(Box)`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: { palette } }) => palette.neutralLighterAlt};
  }
`;

export interface ISearchTerms {
  from?: string;
  to?: string;
  subject?: string;
  freeText?: string;
}

export interface IMessageCard {
  message: SharedEmail;
  onClick?: (message: SharedEmail) => void;
  disabled?: boolean;
  hideTooltips?: boolean;
  searchTerms?: ISearchTerms;
  senderImageUrl?: string;
}

const MessageCard = ({
  message,
  onClick,
  disabled,
  searchTerms,
  senderImageUrl,
  hideTooltips = false,
}: IMessageCard) => {
  const { subject, lastActivity, description, createdBy } = message;
  const email = createdBy?.email;
  // const senderDisplayName = sender?.emailAddress?.name || sender?.emailAddress?.address;
  const profilePic = useProfilePicture(email || '');
  const onMessageClick = useCallback(() => {
    onClick && !disabled && onClick(message);
  }, []);

  const addressSearchTerm = searchTerms?.from || searchTerms?.to || '';
  const subjectSearchTerm = searchTerms?.subject || '';
  const freeTextSearchTerm = searchTerms?.freeText || '';

  return (
    <Root onClick={onMessageClick} width="100%" height={80}>
      <Box padding="xs,md" align="center">
        <Tooltip
          hidden={hideTooltips}
          content={`last activity ${utils.getRelativeDisplayDate(new Date(lastActivity))}`}
        >
          <Persona
            hidePersonaDetails={true}
            search={addressSearchTerm}
            imageUrl={profilePic}
            size={PersonaSize.size24}
          />
        </Tooltip>
      </Box>
      <Box padding="xs,md,xs,0" asColumn flex={1} clip justify="center">
        <Box width="100%" justify="space-between">
          {/* <Box>
            <Text level="small" color="black">
              <Highlighter search={addressSearchTerm}>{senderDisplayName}</Highlighter>
            </Text>
          </Box> */}
          <Box>
            <Text level="small" color="black">
              {utils.getRelativeDisplayDate(new Date(lastActivity))}
            </Text>
          </Box>
        </Box>
        <Tooltip hidden={hideTooltips} content={subject}>
          <Box width="100%" padding="xss,0">
            <Text level="medium" color="accent" clip lineHeight={24} bold>
              <Highlighter search={subjectSearchTerm}>{subject}</Highlighter>
            </Text>
          </Box>
        </Tooltip>
        {description && (
          <Tooltip hidden={hideTooltips} content={description}>
            <Box width="100%" clip>
              <Text level="small" color="neutralTertiary" clip>
                <Highlighter search={freeTextSearchTerm}>{description}</Highlighter>
              </Text>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Root>
  );
};

export default MessageCard;
