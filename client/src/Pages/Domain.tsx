import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import UserInfo from './UserInfo';
import UserInfoEdit from './UserInfoEdit';
import HomeMap from '../Map/HomeMap';
import Mypage from './Mypage';
import Community from './Community';
import CommunityDetail from './CommunityDetail';
import Post from './Post';
import PostEdit from './PostEdit';
import AddMarker from './AddMarker';
import NotFound from './NotFound';
import PrivateRoute from '../Components/PrivateRouter';
import { axiosRefresh } from '../util/Inter';

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
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/community' element={<Community />} />
          <Route path='/community/:id' element={<CommunityDetail />} />
          <Route path='/post' element={<Post />} />
          <Route path='/postedit' element={<PostEdit />} />
          <Route path='/addmarker' element={<AddMarker />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
