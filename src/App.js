import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import RegistPage from './pages/register/register'
import { createGlobalStyle } from "styled-components";
import NotFound from './pages/notfound';
import TodoPage from './pages/todo/todo';
import PrivateRoute from './lib/privateRoute';

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nanum Gothic';
  }
  html, body, div#root {
    height: 100%;
  }
  body {
    font-size: 1rem;
    line-height: 1.6;
    background: #fafafa;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: default;
  }
  @font-face {
    font-family: 'Nanum Gothic';
    font-style: normal;
    font-weight: 400;
    src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.eot);
    src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.eot?#iefix) format('embedded-opentype'),
         url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.woff2) format('woff2'),
         url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.woff) format('woff'),
         url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf) format('truetype');
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute component={<LoginPage />} />}/>
          <Route path="/register" element={<RegistPage />} />
          <Route path="/todo" element={<PrivateRoute component={<TodoPage />} />}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
