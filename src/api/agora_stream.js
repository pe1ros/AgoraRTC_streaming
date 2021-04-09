import instance from './axiosInstance';

export default function agoraStreamRequestInstance(data) {
  return instance.post('/users/generate-stream', data);
}
