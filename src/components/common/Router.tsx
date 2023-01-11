import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Error404 from '../../pages/Error404';
import Home from '../../pages/Home';
import Library from '../../pages/Library';
import Login from '../../pages/Login';
import MakerLanding from '../../pages/MakerLanding';
import PlayerLanding from '../../pages/PlayerLanding';
import Signup from '../../pages/Signup';
import Voting from '../../pages/Voting';
import { AuthComponent } from '../Auth';
import Nickname from '../Auth/Nickname';

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MakerLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth/kakao/callback" element={<AuthComponent />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playerlanding" element={<PlayerLanding />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default Router;
