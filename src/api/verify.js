import instance from './axiosInstance';

export default function verifyRequestInstance(
  data,
) {
  return instance.post('/auth/verify', data);
}
