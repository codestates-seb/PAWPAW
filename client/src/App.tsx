import React from 'react';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UserInfo from './Pages/UserInfo';
import UserInfoEdit from './Pages/UserInfoEdit';
import HomeMap from './Map/Map'

function App() {
  return (
    <div className='App'>

      <Login />
      <SignUp />
      <UserInfo />
      <UserInfoEdit />
    </div>
  );
}
export default App;
