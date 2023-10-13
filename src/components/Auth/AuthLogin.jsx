import React, { useEffect, useState } from 'react';
import { msalInstance } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    uniqueId: ''
  });

  useEffect(() => {
    async function initializeMsal() {
      await msalInstance.initialize();
    }
    initializeMsal();
  }, []);

  useEffect(() => {
    if (data.email) {
      isEmailExist();
    }
  }, [data.email]);

  const login = async () => {
    try {
      await msalInstance.loginPopup();
      const userAccount = msalInstance.getAllAccounts()[0];
      console.log(userAccount);
      
      setData({
        ...data,
        email: userAccount.username,
        username: userAccount.name,
        uniqueId: userAccount.localAccountId
      });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const isEmailExist = async () => {
    try {
      const res = await axios.get(`http://localhost:5070/Auth/isEmailExists?email=${(data.email)}`);
      console.log(res);
  
      if (res.data === "email already exists.") {
        const { roleId, userId, tokenid } = response.data;
        localStorage.setItem("tokenId", )
        loginApi(data.email, data.uniqueId);
      } else {
        signUpApi(data.username, data.email, data.uniqueId);
      }
    } catch (error) {
      console.error('isEmailExists API error:', error);
    }
  };
  

  const loginApi = async (email, uniqueId) => {
    try {
      const response = await axios.post('http://localhost:5070/Auth/login', {
        email,
        uniqueId,
      });
      if (response.status === 200) {
        navigate('/home');
      }
      console.log('Login API Response:', response.data);
    } catch (error) {
      console.error('Login API error:', error);
    }
  };

  const signUpApi = async (username, email, uniqueId) => {
    try {
      const response = await axios.post('http://localhost:5070/Auth/signUp', {
        username,
        email,
        uniqueId,
      });
      if (response.status === 200) {
        navigate('/home');
      }
      console.log('Sign Up API Response:', response.data);
    } catch (error) {
      console.error('Sign Up API error:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <p>Click the button to sign in:</p>
      <button className='btn btn-primary' onClick={login}>Sign In</button>
    </div>
  );
};

export default AuthLogin;
