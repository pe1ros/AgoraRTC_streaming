import instance from './axiosInstance';

export default function userDataRequestInstance() {
  return instance.get('/auth/me');
}
