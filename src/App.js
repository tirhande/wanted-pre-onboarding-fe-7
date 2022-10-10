import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import RegistPage from './pages/register/register'
import NotFound from './pages/notfound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/register" element={<RegistPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
