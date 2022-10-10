import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

  return (
    <div>
      <form>
        <input type="text" name="email" required/>
        <input type="password" name="password" required/>
        <button type="submit">로그인</button>
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
