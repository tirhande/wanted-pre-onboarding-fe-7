import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request, setRequestHeaders } from "../../lib/request";
import { LoginDiv } from "../../styles/styles";

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
      const res = await request.post("/auth/signin", {
        email: loginInfo.email,
        password: loginInfo.password
      });
      localStorage.setItem('accessToken', res.data.access_token);
      setRequestHeaders(res.data.access_token);
      navigate('/todo');
    } catch (e) {
      console.log(e);
      // e.response.data.message === Unauthorized
      alert(e.response.data.message)
    }
  };

  return (
    <LoginDiv>
      <form onSubmit={loginSubmit}>
        <h1>로그인</h1>
        <input type="text" name="email" value={loginInfo.email} onChange={inputChange} placeholder="이메일 주소" required/>
        <input type="password" name="password" value={loginInfo.password} onChange={inputChange} placeholder="비밀번호" required/>
        <button type="submit" disabled={!isValid}>로그인</button>
        <p>
          <Link to="/register">
            회원가입
          </Link>
        </p>
      </form>
    </LoginDiv>
  );
};

export default LoginPage;
