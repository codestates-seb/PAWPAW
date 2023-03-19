import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRouter';
import HomeMap from '../Map/HomeMap';
import { axiosRefresh } from '../util/GlobalAxios';
import AddMarker from './AddMarker';
import Community from './Community';
import CommunityDetail from './CommunityDetail';
import Login from './Login';
import Mypage from './Mypage';
import Friendpage from './Friendpage';
import NotFound from './NotFound';
import PostWrite from './PostWrite';
import PostEdit from './PostEdit';
import SignUp from './SignUp';
import UserInfo from './UserInfo';
import UserInfoEdit from './UserInfoEdit';

export default function Router() {
  axiosRefresh;
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
          <Route path='/mypage/:petId' element={<Mypage />} />
          <Route path='/friendpage/:petId' element={<Friendpage />} />
          <Route path='/community' element={<Community />} />
          <Route path='/community/:id' element={<CommunityDetail />} />
          <Route path='/post' element={<PostWrite />} />
          <Route path='/postedit' element={<PostEdit />} />
          <Route path='/addmarker' element={<AddMarker />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
