import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import UserInfo from './UserInfo';
import UserInfoEdit from './UserInfoEdit';
import HomeMap from '../Map/HomeMap';
import Mypage from './Mypage';
import Community from './Community';
import CommunityDetail from './CommunityDetail';
import PrivateRoute from '../Components/PrivateRouter';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/userinfo' element={<UserInfo />} />
        </Route>
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path='/userinfoedit' element={<UserInfoEdit />} />
          <Route path='/map' element={<HomeMap />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/community' element={<Community />} />
          <Route path='/community/:id' element={<CommunityDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
