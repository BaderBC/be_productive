import Cookies from 'js-cookie';

export interface UserPublicInfo {
  userId: number;
  email: string;
}

export const getUser = (): UserPublicInfo | null => {
  const cookie = Cookies.get('user-public-info');
  if (cookie) {
    return JSON.parse(cookie);
  }
  return null;
}
