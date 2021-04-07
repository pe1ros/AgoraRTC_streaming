import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import { connect } from 'react-redux';

import {verifyRequest} from '../../store/login/actions';
import styles from '../Login/styles.module.scss';

const Verify = ({verifyRequest, login}) => {
  const [code, setCode] = useState();

  const verifyRequestHandler = () => {
    verifyRequest({
      login: login,
      accessCode: code,})
  };

  return (
    <div className={styles.login_screen}>
      <div className={styles.login_screen_wrapper}>
        <TextField
          className={styles.login_screen_input}
          id="outlined-basic"
          label="verification code"
          variant="outlined"
          value={code}
          type='number'
          onChange={(e) => setCode(e.target.value)}/>
        <Button variant="contained" color="primary" className="left" onClick={() => verifyRequestHandler()}>Verify my code</Button>
      </div>
    </div>
  )
};
const mapStateToProps = (state) => ({
  error: state.loginReducer.error,
  login: state.loginReducer.login,
});
const mapDispatchToProps = {
  verifyRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);