import React from 'react';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserInfo from './Pages/UserInfo';

function App() {
  return (
    <div className='App'>
      <Login />
      <SignUp />
      <UserInfo />
    </div>
  );
}

export default App;
