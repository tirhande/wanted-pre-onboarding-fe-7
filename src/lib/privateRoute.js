import React from "react";
import { Navigate } from "react-router-dom";

const authCheck = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (accessToken) ? true : false;
}

const PrivateRoute = ({ component }) => {
  const isAuth = authCheck();
  const pathName = window.location.pathname;

  return isAuth ?
    pathName === '/' ? 
      <Navigate to="/todo" />
      : component
    :
    pathName === '/' ? 
      component
      : <Navigate to="/" {...alert("접근할 수 없는 페이지입니다.")} />;
};
export default PrivateRoute;
