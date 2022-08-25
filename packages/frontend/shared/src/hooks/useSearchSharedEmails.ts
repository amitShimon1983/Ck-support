import { useQuery, gql } from './apollo';

export const GET_SEARCH_SHARED_EMAILS = gql`
  query search($teamObjectId: String, $searchText: String, $filters: Filters, $skip: Float, $limit: Float) {
    search(
      args: { teamObjectId: $teamObjectId, searchText: $searchText, filters: $filters, skip: $skip, limit: $limit }
    ) {
      records {
        _id
        subject
        lastActivity
        description
        createdBy {
          email
        }
      }
      endCursor
      hasNextPage
      page
      total
    }
  }
`;

const useSearchSharedEmails = ({
  teamObjectId,
  searchText,
  filters,
  skip,
  limit,
}: {
  teamObjectId?: string;
  searchText?: string;
  filters?: any;
  skip?: number;
  limit?: number;
}) => {
  return useQuery(GET_SEARCH_SHARED_EMAILS, {
    skip: !teamObjectId,
    variables: {
      teamObjectId,
      searchText,
      filters,
      skip,
      limit,
    },
  });
};

export default useSearchSharedEmails;
