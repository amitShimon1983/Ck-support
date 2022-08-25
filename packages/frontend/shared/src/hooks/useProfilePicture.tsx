import { gql, useLazyQuery } from './apollo';
const GET_PROFILE_PICTURE = gql`
  query GetProfilePicture($principalName: String!) {
    getProfilePicture(args: { principalName: $principalName }) {
      base64ByteArray
      principalName
    }
  }
`;

const pictureMaxInvalidationTime = 604800000; //1 Week

function isPictureValid(timeCached: any) {
  return pictureMaxInvalidationTime > Date.now() - timeCached;
}
export const useLazyProfilePicture = () => {
  const [getProfilePicture, { data, called }] = useLazyQuery(GET_PROFILE_PICTURE);
  return { getProfilePicture };
};
export default function useProfilePicture(emailAddress: string) {
  const item = JSON.parse(localStorage.getItem(emailAddress) || '{}');
  const [getProfilePicture, { data, called }] = useLazyQuery(GET_PROFILE_PICTURE, {
    variables: {
      principalName: emailAddress,
    },
  });

  if (!emailAddress?.trim()) {
    return null;
  }

  if (item?.base64ByteArray) {
    return item?.base64ByteArray;
  }

  if ((!called && emailAddress) || (item?.base64ByteArray && !isPictureValid(item?.base64ByteArray))) {
    getProfilePicture();
  }

  if (data?.getProfilePicture?.base64ByteArray) {
    localStorage.setItem(
      emailAddress,
      JSON.stringify({ base64ByteArray: data?.getProfilePicture?.base64ByteArray, timeCached: Date.now() })
    );
  }

  return null;
}
