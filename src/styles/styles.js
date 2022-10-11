import styled, { css } from "styled-components";

const CommonStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;

  h1 {
    text-align: center;
    font-size: 1.5em;
  }
`;

const FormStyle = css`
  h1 {
    margin-bottom : 2rem;
  }
  form {
    width: 350px;
    margin: 0 auto;
    border: 1px solid #ddd;
    padding: 2rem;
    background: #ffffff;
  }
  input {
    background: #fafafa;
    border: 1px solid #eeeeee;
    padding: 12px;
    width: 100%;
    margin-bottom: 1rem;
  }
  button[type="submit"] {
    background: #69d2e7;
    border: 1px solid #ddd;
    color: #ffffff;
    padding: 10px;
    width: 100%;
  }
  button:disabled {
    background: #e0e0e0;
    color: #aaa;
  }
`;

export const LoginDiv = styled.div`
  ${CommonStyle}
  ${FormStyle}
  p {
    margin-top: 1em;
    text-align: right;
    font-size: 0.8em;
  }
`;

export const RegisterForm = styled.form`
  ${CommonStyle}
  ${FormStyle}
`;

export const TodoWrap = styled.div`
  ${CommonStyle}
  padding: 3% 0;
  width: 50%;
  margin: auto;
  header, footer {
    margin: 1rem 0;
  }
  form {
    width: 40%;
    text-align: center;
    margin-bottom: 1rem;
  }
  input {
    padding: 6px;
    width: 50%;
    border: 1px solid #aaa;
    border-radius: 3px;
    background: #fff;
  }
  input:disabled {
    background: #dadada;
    border: 1px solid #d6d6d6;
  }
  button {
    padding: 0.2em 0.8em;
    margin: 0 5px;
  }
  footer {
    button {
      border-width: 1px;
    }
    button[aria-current="page"] {
      background: #69d2e7;
    }
  }
`;

export const TodoDiv = styled.div`
  height: 500px;
`;

export const TodoTable = styled.main`
  display: table;
  width: 700px;
  padding: 0 1%;
  border-collapse: collapse;

  ul {
    display: table-row;
    border-bottom: 1px solid #aaa;
  }
  ul:not(.subject) {
    height: 10%;
    li:first-child span {
      font-size: 1.3em;
    }
    li span.empty_check {
      cursor: pointer;
    }
  }
  ul.subject {
    display: table-header-group;
    border-bottom: 1.5px solid #aaa;
  }
  li {
    display: table-cell;
    text-align: center;
    font-size: 0.8em;
    padding: 0.5em;

    button {
      padding: 0.2em 0.8em;
      margin: 0 5px;
    }
  }
  li.edit_btns {
    width: 140px;
  }

`;