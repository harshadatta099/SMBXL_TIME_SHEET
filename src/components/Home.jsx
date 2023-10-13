import React from 'react'
import {msalInstance} from '../config.js'

const Home = () => {


  const getUserInfo = ()=>{

    const userAccount = msalInstance.getAllAccounts()[0];
    console.log(userAccount);
  
  }
  let userName = localStorage.getItem("userName");
  userName = JSON.parse(userName);
  
  return (
    <div>
      userName: {userName}
<button onClick={getUserInfo}>getUserInfo</button>
    </div>
  )
}

export default Home