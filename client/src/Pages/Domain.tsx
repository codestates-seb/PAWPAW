import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import UserInfo from './UserInfo';
import UserInfoEdit from './UserInfoEdit';
const HomeMap = React.lazy(() => import('../Map/HomeMap'));
import Mypage from './Mypage';
import PrivateRoute from '../Components/PrivateRouter';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
        {/* <Route index element={<Login />} />
        <Route index element={<SignUp />} /> */}

        {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/userinfo' element={<UserInfo />} />
        </Route>

        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path='/userinfiedit' element={<UserInfoEdit />} />
          <Route path='/map' element={<HomeMap />} />
          <Route path='/mypage' element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
