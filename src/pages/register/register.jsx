import React from "react";

const RegistPage = () => {

  return (
    <form>
      <input type="text" name="email" required/>
      <input type="password" name="password" required/>
      <input type="password" name="passwordCheck" required/>
      <button type="submit">회원 가입</button>
  </form>
  );
};

export default RegistPage;
