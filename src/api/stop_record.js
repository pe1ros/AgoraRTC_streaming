import instance from './axiosInstance';

export default function agoraStopRecordRequestInstance(data) {
  return instance.post('/users/stop-recording', data);
}
