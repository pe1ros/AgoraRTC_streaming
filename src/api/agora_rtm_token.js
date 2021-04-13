import instance from './axiosInstance';

export default function agforaTokenRtmRequestInstance(data) {
  return instance.post('/users/generate-agora-token-rtm', data);
}
