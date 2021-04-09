import instance from './axiosInstance';

export default function agoraStartRecordRequestInstance(data) {
  return instance.post('/users/start-recording', data);
}
