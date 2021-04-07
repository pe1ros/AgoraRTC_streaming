/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';

import styles from './styles.module.scss';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8'});
const subscrib = [];
const rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
};

const options = {
  appId: 'a234c6cd9e27460d881b1158758aaf38',
  channel: 'nissi',
  token: '006a234c6cd9e27460d881b1158758aaf38IAAE9bNIWUB73BXJ4bLfd1KEV2olKyqzCedvdDVzz9pCbHijxcAAAAAAEAAeXT+cOnVsYAEAAQA6dWxg',
};


client.on('user-published', async (user: { videoTrack: any; uid: { toString: () => string; }; audioTrack: any; }, mediaType: string) => {
  await client.subscribe(user, mediaType);
  console.log('subscribe success');
  const playerContainer = document.getElementById("subs");

  if (mediaType === "video") {
    const subsCont = document.createElement("div");
    subsCont.onclick = () =>user.videoTrack.stop();
    subsCont.id = user.uid.toString();
    subsCont.style.width = "150px";
    subsCont.style.height = "150px";
    const remoteVideoTrack = user.videoTrack;
    playerContainer.append(subsCont);
    remoteVideoTrack.play(subsCont);
  }
  if (mediaType === 'audio') {
    const remoteAudioTrack = user.audioTrack;
    remoteAudioTrack.play();
  }
});

client.on('user-unpublished', (user: { uid: string; }) => {
  const playerContainer = document.getElementById(user.uid);
  playerContainer?.remove();
});

const startStream = async () => {
  const uid = await client.join(options.appId, options.channel, options.token, 1);
  const wrapper = document.getElementById("player");
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  const playerContainer = document.createElement("div");
    playerContainer.style.width = "640px";
    playerContainer.style.height = "480px";
    wrapper.appendChild(playerContainer);
    rtc.localVideoTrack.play(playerContainer);
    rtc.localAudioTrack.play();

  await client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

  console.log('publish success!');
};
const endStream = async () => {
  rtc.localAudioTrack.close();
  rtc.localVideoTrack.close();
  client.remoteUsers.forEach(user => {
  const playerContainer = document.getElementById(user.uid);
  playerContainer && playerContainer.remove();
});
  await client.leave();
};

const Live = () => {
  return (
    <div className={styles.live__main}>
      <div className={styles.live__mainWindow} >
        <div className={styles.live__subscribers} id='subs' >
        
        </div>
        <div className={styles.live__lectorwindow} id='player'>

        </div>
        <div className={styles.live__buttonwrapper}>
          <button type="button" onClick={startStream} className={styles.live__btnStart}>Start</button>
          <button type="button" onClick={endStream} className={styles.live__btnEnd}>End</button>
        </div>
      </div>
    </div>
  );
};

export default Live;
