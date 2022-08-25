import { useLazyQuery, gql } from './apollo';
export const GET_CONVERSATION = gql`
  query GetConversation($sharedMailId: String, $sort: Sort) {
    getConversation(args: { sharedMailId: $sharedMailId, sort: $sort }) {
      _id
      messages {
        _id
        messageId
        sharedEmail {
          _id
        }
        mailboxId
        internetMessageId
        conversationId
        conversationIndex
        parentFolderId
        createdDateTime
        lastModifiedDateTime
        receivedDateTime
        sentDateTime
        hasAttachments
        subject
        from {
          emailAddress {
            address
            name
          }
        }
        sender {
          emailAddress {
            address
            name
          }
        }
        replyTo {
          emailAddress {
            address
            name
          }
        }
        bccRecipients {
          emailAddress {
            address
            name
          }
        }
        ccRecipients {
          emailAddress {
            address
            name
          }
        }
        toRecipients {
          emailAddress {
            address
            name
          }
        }
        body {
          content
          contentType
          editedContent
        }
        bodyPreview
        importance
        isDraft
        isRead
        webLink
        attachments {
          attachmentId
          name
          contentType
          size
          isInline
          contentId
        }
        commentThreads {
          threadId
          authorId
          comments {
            channelId
            threadId
            commentId
            content
            authorId
            createdAt
          }
        }
      }
    }
  }
`;
export const useGetConversation = () => {
  const [loadConversation, { loading, data, called, fetchMore, refetch }] = useLazyQuery(GET_CONVERSATION);
  return {
    loading,
    data,
    loadConversation,
    called,
    fetchMore,
    refetch,
  };
};
