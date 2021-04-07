import instance from './axiosInstance';

export default function loginRequestInstance(
  data,
) {
  return instance.post('/auth/sign-in', data);
}
