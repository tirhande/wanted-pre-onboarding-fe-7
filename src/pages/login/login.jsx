import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  const inputChange = (e) => setLoginInfo({...loginInfo, [e.target.name]:e.target.value});

  useEffect(() => {
    if(/\S+@\S+\.\S+/.test(loginInfo.email) && loginInfo.password.length >= 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [loginInfo]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signin", {
        email: loginInfo.email,
        password: loginInfo.password
      });

      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/todo');
    } catch (e) {
      console.log(e);
      // e.response.data.message === Unauthorized
      alert(e.response.data.message)
    }
  };

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <input type="text" name="email" value={loginInfo.email} onChange={inputChange} placeholder="이메일 주소" required/>
        <input type="password" name="password" value={loginInfo.password} onChange={inputChange} placeholder="비밀번호" required/>
        <button type="submit" disabled={!isValid}>로그인</button>
      </form>
      <Link to="/register">
        <button>
          회원가입
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;
