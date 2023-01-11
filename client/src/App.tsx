import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Domain from './Pages/Domain';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserInfo from './Pages/UserInfo';
import UserInfoEdit from './Pages/UserInfoEdit';
import HomeMap from './Map/HomeMap';
import Modal from './Components/Modal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Domain />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/userinfo' element={<UserInfo />} />
        <Route path='/userinfoedit' element={<UserInfoEdit />} />
        <Route path='/map' element={<HomeMap />} />
        <Route path='/modal' element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
