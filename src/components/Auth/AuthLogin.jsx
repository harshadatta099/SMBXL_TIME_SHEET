import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Card } from "react-bootstrap";
import { msalInstance } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../Logo";

import '../Auth/style.css'
import {BASE_URL } from '../../services/API.js';
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

  const roleNavigation = {
    "1": "/user",
    "2": "/hr",
    "3": "/admin"
  };
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
      const res = await axios.get(`${BASE_URL}/Auth/isEmailExists?email=${(data.email)}`);
      console.log(res);

      if (res.data === "email already exists.") {

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
        const { roleId, userId, tokenid } = response.data;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("tokenid", tokenid);
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId);
        const userRole = localStorage.getItem("roleId");
        const destination = roleNavigation[userRole];
        if (destination) {
          navigate(destination, { replace: true });
          window.location.reload();
        }
      }
      console.log('Login API Response:', response.data);
    } catch (error) {
      console.error('Login API error:', error);
    }
  };

  const signUpApi = async (username, email, uniqueId) => {
    try {
      const response = await axios.post(`${BASE_URL}/Auth/signUp`, {
        username,
        email,
        uniqueId,
      });
      if (response.status === 200) {
        const { roleId, userId, tokenid } = response.data;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("tokenid", tokenid);
        localStorage.setItem("roleId", roleId);
        localStorage.setItem("userId", userId);
        const userRole = localStorage.getItem("roleId");
        const destination = roleNavigation[userRole];
        if (destination) {
          navigate(destination, { replace: true });
          window.location.reload();
        }
      }
      console.log('Sign Up API Response:', response.data);
    } catch (error) {
      console.error('Sign Up API error:', error);
    }
  };

  return <>
    <div className='main'>
      <div className="log-screen">
        <div className="login-content">
          <div className='logo'>
            <Logo />
          </div>
          <h5 className='mt-3'>Please click the button below to sign in.</h5>
          <Button variant="primary" type="submit" className="mt-3 w-100 signin-cta " onClick={login} >
            <span className='fs-bold signin-cta'>SignIn</span>
          </Button>
          {/* <h2 className='mt-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, deleniti.</h2> */}
        </div>
      </div>
    </div>



  </>
};

export default AuthLogin;
