import useGetUserOrganizations from '../hooks/useGetUserOrganizations';
import useGetOrganizationsTeams from '../hooks/useGetOrganizationsTeams';
import { appContextVar } from '../services';
import { useQuery, gql, useReactiveVar } from './apollo';

export const GET_USER_QUERY = gql`
  query getUser($userObjectId: String) {
    getUser(args: { userObjectId: $userObjectId }) {
      _id
      email
      firstName
      lastAccess
      lastName
      tenantId
    }
  }
`;

const useGetUser = () => {
  const { user: reactiveUser } = useReactiveVar(appContextVar);
  const userObjectId = reactiveUser?.data?._id;
  const {
    data: organizations,
    loading: organizationsLoading,
    error: organizationsError,
  } = useGetUserOrganizations(userObjectId, 'Admin');

  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useGetOrganizationsTeams(organizations?.getUserOrganizations.map(({ organization }) => organization._id));
  const user = reactiveUser?.data;
  const userNameArr = user.name.split(' ');
  return {
    loading: organizationsLoading || teamsLoading,
    error: organizationsError || teamsError,
    data:
      organizations && teams
        ? {
            user: {
              tenantId: user?.tid,
              email: user?.upn,
              _id: user?._id,
              firstName: userNameArr?.[1],
              lastName: userNameArr?.[0],
            },
            ...reactiveUser,
            organizations: organizations?.getUserOrganizations,
            teams: teams?.getOrganizationsTeams,
          }
        : null,
  };
};

export default useGetUser;
