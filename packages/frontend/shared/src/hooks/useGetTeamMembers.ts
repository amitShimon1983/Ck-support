import { useQuery, gql } from './apollo';

export const GET_TEAM_MEMBERS_QUERY = gql`
  query getTeamMembers($teamObjectId: String, $role: String) {
    getTeamMembers(args: { teamObjectId: $teamObjectId, role: $role }) {
      user {
        _id
        firstName
        lastName
        email
      }
      role
    }
  }
`;

const useGetTeamMembers = (teamObjectId: string, role?: string, onCompleted?: (data: any) => Promise<void>) => {
  return useQuery(GET_TEAM_MEMBERS_QUERY, {
    variables: {
      teamObjectId,
      ...(role && { role }),
    },
    onCompleted,
  });
};

export default useGetTeamMembers;
