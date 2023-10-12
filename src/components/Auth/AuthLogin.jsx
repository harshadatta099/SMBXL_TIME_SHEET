import React ,{useEffect}from 'react';
import {msalInstance} from '../../config.js'

const AuthLogin = () => {

  useEffect(() => {
    async function initializeMsal() {
      await msalInstance.initialize();
    }
    initializeMsal();
  }, []);
  const login = async () => {
    try {
      await msalInstance.loginPopup();
      
      window.location.href = '/home';
      getUserInfo();

    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
const getUserInfo = ()=>{

  const userAccount = msalInstance.getAllAccounts()[0];
  console.log(userAccount);

}
   


  return (
    <div>
      <h2>Sign In</h2>
      <p>Click the button to sign in:</p>
      <button onClick={login}>Sign In</button>
      {/* <button onClick={logout}>Sign out</button> */}
      <button onClick={getUserInfo}>getUserInfo</button>
    </div>
  );
};

export default AuthLogin;
