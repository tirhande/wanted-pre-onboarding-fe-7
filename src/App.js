import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import RegistPage from './pages/register/register'
import NotFound from './pages/notfound';
import TodoPage from './pages/todo/todo';
import PrivateRoute from './lib/privateRoute';
import { GlobalStyles } from './styles/styles';


const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename="wanted-pre-onboarding-fe-7">
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
