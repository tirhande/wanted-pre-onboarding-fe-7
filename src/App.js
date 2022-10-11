import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import RegistPage from './pages/register/register'
import { createGlobalStyle } from "styled-components";
import NotFound from './pages/notfound';
import TodoPage from './pages/todo/todo';
import PrivateRoute from './lib/privateRoute';

const GlobalStyles = createGlobalStyle`
    html, body, div#root {
      height: 100%;
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
