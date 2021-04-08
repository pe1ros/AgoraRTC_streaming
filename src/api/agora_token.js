import instance from './axiosInstance';

export default function agforaTokenRequestInstance(data) {
  return instance.post('/users/generate-agora-token', data);
}
