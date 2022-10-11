import axios from "axios";
import React, { useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom'

const RegistPage = () => {
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState({
    email: {
      value: "",
      msg: "",
    },
    password: {
      value: "",
      msg: "",
    },
    passwordCheck: {
      value: "",
      msg: "",
    },
  });

  const inputChange = useCallback((e) => {
    const { name, value } = e.target;

    let msg = '';
    if(value === '')
      msg = (name === 'email') ? '이메일 주소를 입력해주세요.' : '올바르지 않은 형식입니다.';
    else if(name === 'email' && !/\S+@\S+\.\S+/.test(value))
      msg = '잘못된 이메일 형식입니다.';
    else if((name === 'password' || name === 'passwordCheck') && value.length < 8)
      msg = '8자리 이상 입력해주세요.';
    else if(name === 'pwdCheck' && userInfo.pwd.value !== value)
      msg = '동일한 비밀번호를 입력해주세요.';
      
    setUserInfo({
      ...userInfo,
      [name]: {
        ...userInfo[name],
        value: value,
        msg: msg,
      },
    });
  }, [userInfo]);

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", {
        email: userInfo.email.value,
        password: userInfo.password.value
      });

      localStorage.setItem('accessToken', res.data.access_token);
      alert('회원 가입이 완료 되었습니다.');
      navigate('/');
    } catch(e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };

  return (
    <form onSubmit={onRegisterSubmit}>
      <input type="text" name="email" onChange={inputChange} placeholder="이메일 주소" required/>
      <input type="password" name="password" onChange={inputChange} placeholder="비밀번호" required/>
      <input type="password" name="passwordCheck" onChange={inputChange} placeholder="비밀번호 확인" required/>
      <button type="submit">회원 가입</button>
  </form>
  );
};

export default RegistPage;
