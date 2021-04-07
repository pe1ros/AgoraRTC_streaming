import React, {useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {loginRequest, setloginNumber} from '../../store/login/actions';
import styles from './styles.module.scss';

const Login = ({loginRequest, error, login, setloginNumber}) => {
  const [number, setNumber] = useState();
  const history = useHistory();

  const loginHandler = () => {
    loginRequest({login: `86${number}`})
    setloginNumber(`86${number}`)
  };

  useEffect(() => {
    if (login && !error) {
      history.push('/verify')
    }
  }, [login, error])

  return (
    <div className={styles.login_screen}>
      <div className={styles.login_screen_wrapper}>
        <div className={styles.login_screen_mask}>+86</div>
        <TextField
          className={styles.login_screen_input}
          id="outlined-basic"
          label="phone number"
          variant="outlined"
          value={number}
          type='number'
          onChange={(e) => setNumber(e.target.value)}/>
        <Button variant="contained" color="primary" className="left" onClick={() => loginHandler()}>Send me code</Button>
      </div>
    </div>
  )
};
const mapStateToProps = (state) => ({
  error: state.loginReducer.error,
  login: state.loginReducer.login,
});
const mapDispatchToProps = {
  loginRequest,
  setloginNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);