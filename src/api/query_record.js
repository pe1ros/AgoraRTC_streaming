import instance from './axiosInstance';

export default function agoraQueryRecordRequestInstance(data) {
  return instance.post('/users/query-record', data);
}
