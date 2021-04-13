import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';

import AgoraRTM from 'agora-rtm-sdk';
import {
  agoraTokenRequest,
  agoraStreamRequest,
  agoraStartRecordRequest,
  agoraStopRecordRequest,
  agoraQueryRecordRequest,
  agoraTokenRtmRequest
} from '../../store/login/actions';
import styles from './styles.module.scss';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8'});

let subscribers = [];
let chatMessages = [];
const rtc = {
  localAudioTrack: null,
  localVideoTrack: null,
};

let options = {
  appId: 'a234c6cd9e27460d881b1158758aaf38',
  channel: 'nissi',
  token: null,
  tokenRtm: null,
};

const clientMessage = AgoraRTM.createInstance('a234c6cd9e27460d881b1158758aaf38'); 
const channel = clientMessage.createChannel('nissi');

const login = (token, account) => {

  clientMessage.login({ token: token, uid: account }).then(() => {
    channel.join().then(() => {
      console.log('JOINED');
      }).catch(error => {
        console.log('NOT_JOINED', error);
      });
  }).catch(err => {
    console.log('AgoraRTM client login failure', err);
  });
}

clientMessage.on('ConnectionStateChanged', (newState, reason) => {
console.log('on connection state changed to ' + newState + ' reason: ' + reason);
});
channel.on('ChannelMessage', (message, memberId, messageProps) => {
  chatMessages.push({userId: memberId, message: message.text})
  });
client.on('user-published', async (user, mediaType) => {
  await client.subscribe(user, mediaType);
  const playerContainer = document.getElementById("subs");
  if (subscribers.indexOf(user.uid) === -1) {
      subscribers = [...subscribers, user.uid]
  }
  console.log(subscribers);

  if (mediaType === "video") {
    const subsCont = document.createElement("div");
    subsCont.onclick = () => toggleAudio(user);
    subsCont.id = user.uid.toString();
    subsCont.style.width = '150px';
    subsCont.style.height = '150px';
    subsCont.style.border = 'solid 3px #000';
    const remoteVideoTrack = user.videoTrack;
    playerContainer.append(subsCont);
    remoteVideoTrack.play(subsCont);
  }
  if (mediaType === 'audio') {
    const remoteAudioTrack = user.audioTrack;
    remoteAudioTrack.play();
  }
});

client.on('user-unpublished', (user) => {
  const playerContainer = document.getElementById(user.uid);
  playerContainer?.remove();
});

const startStream = async (user) => {
  const uid = await client.join(options.appId, options.channel, options.token, user.id);
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
  const playerContainer = document.getElementById("player");
  const subContainer = document.getElementById("subs");
  playerContainer.innerHTML = '';
  subContainer.innerHTML = '';
  rtc.localAudioTrack.close();
  rtc.localVideoTrack.close();
  await client.leave();
};

const shareScreen = async (share, setShare) => {
  const playerContainer = document.getElementById("player");
  console.log('share', share);
  if (!share) {
    AgoraRTC.createScreenVideoTrack({
      encoderConfig: "1080p_1",
    }).then(async (localScreenTrack )=> {
      await client.unpublish(rtc.localVideoTrack);
      rtc.localVideoTrack = localScreenTrack;
      playerContainer.innerHTML = '';
      localScreenTrack.play(playerContainer);
      await client.publish(rtc.localVideoTrack);
    });
    setShare(true);
  } else {
    playerContainer.innerHTML = '';
    await client.unpublish(rtc.localVideoTrack);
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    const container = document.createElement("div");
    container.style.width = "640px";
    container.style.height = "480px";
    playerContainer.appendChild(container);
    rtc.localVideoTrack.play(container);
    await client.publish(rtc.localVideoTrack);
    setShare(false);
  }
  
};

const toggleAudio = (user) => {
  const player = document.getElementById(user.uid);
  if (user.audioTrack.isPlaying) {
    user.audioTrack.stop();
    player.style.border = 'solid 3px #ff0000';
  } else {
    user.audioTrack.play();
    player.style.border = 'solid 3px #000';
  }
};

const Live = ({
  agoraTokenRequest,
  agoraToken,
  user,
  agoraStreamRequest,
  agoraStreamId,
  agoraStartRecordRequest,
  agoraStopRecordRequest,
  recordInfo,
  agoraQueryRecordRequest,
  agoraTokenRtmRequest,
  agoraTokenRtm
}) => {
  const [share, setShare] = useState(false);
  const [text, setText] = useState('');

  const cloudRecord = async (user, agoraStreamId) => {
    agoraStartRecordRequest({userId: user.id, channelName: "nissi", resourceId: agoraStreamId, mode: "mix"});
  };

  const cloudRecordStop = async (user, agoraStreamId) => {
    agoraStopRecordRequest({userId: user.id, channelName: "nissi", resourceId: recordInfo.resourceId, sid: recordInfo.sid, mode: "mix"});
  };

  const queryRecord = async (recordInfo) => {
    agoraQueryRecordRequest({resourceId: recordInfo.resourceId, sid: recordInfo.sid, mode: "mix"});
  };

  const handleChange = (e) => {
    setText(e.target.value)
  };

  const sendMessage = () => {
    channel.sendMessage({ text: text }).then(() => {
    }).catch(error => {
      console.log("NOT_SENDED", error);
    });
    chatMessages.push({userId: user.id, message: text})
    setText('');
  };

  useEffect(() => {
    if (!agoraToken && user) {
      agoraTokenRequest({userId: user.id, channelName: 'nissi', role: 'host'});
      agoraStreamRequest({userId: user.id, channelName: 'nissi'});
      agoraTokenRtmRequest({account: user.id});
    }
    options.token = agoraToken;
    options.tokenRtm = agoraTokenRtm;
  }, [agoraToken, user, agoraStreamId])

  useEffect(() => {
    agoraTokenRtm && login(agoraTokenRtm, `${user.id}`)
  }, [agoraTokenRtm])

  return (
    <div className={styles.live__main}>
      <div className={styles.live__mainWindow} >
        <div className={styles.live__subscribers} id='subs' >

        </div>
        <div className={styles.live__lectorwindow} id='player'>

        </div>
        <div className={styles.live__chatroom}>
          {chatMessages.map((date, index) => <div key={index} className={styles.live__chatmessage}>user:{date.userId} message:{date.message}</div>
          )}
          <input type='text' onChange={handleChange} className={styles.live__chatroomInput} value={text} />
          <button type="button" onClick={sendMessage} className={styles.live__btnEnd}>Send</button>
        </div>
        <div className={styles.live__buttonwrapper}>
          <button type="button" onClick={() => startStream(user)} className={styles.live__btnStart}>Start</button>
          <button type="button" onClick={() => endStream()} className={styles.live__btnEnd}>End</button>
          <button type="button" onClick={() => cloudRecord(user, agoraStreamId)} className={styles.live__btnEnd}>start Record</button>
          <button type="button" onClick={() => queryRecord(recordInfo)} className={styles.live__btnEnd}>Query Record</button>
          <button type="button" onClick={() => cloudRecordStop(user, agoraStreamId)} className={styles.live__btnEnd}>stop Record</button>
          <button
            type="button"
            onClick={() => shareScreen(share, setShare)} 
            className={share ? styles.live__btnShareActive : styles.live__btnShare}>
              {share ? 'Stop share' : 'Share screen'}
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  agoraToken: state.loginReducer.agoraToken,
  agoraStreamId: state.loginReducer.agoraStreamId,
  recordInfo: state.loginReducer.recordInfo,
  agoraTokenRtm: state.loginReducer.agoraTokenRtm,
});
const mapDispatchToProps = {
  agoraTokenRequest,
  agoraStreamRequest,
  agoraStartRecordRequest,
  agoraStopRecordRequest,
  agoraQueryRecordRequest,
  agoraTokenRtmRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Live);
