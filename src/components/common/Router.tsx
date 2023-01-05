import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Error404 from '../../pages/Error404';
import Home from '../../pages/Home';
import Library from '../../pages/Library';
import Login from '../../pages/Login';
import MakerLanding from '../../pages/MakerLanding';
import PlayerLanding from '../../pages/PlayerLanding';
import Share from '../../pages/Share';
import Signup from '../../pages/Signup';
import Voting from '../../pages/Voting';
import CurrentVoteDetail from '../Home/CurrentVoteDetail';

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currentvotedetail" element={<CurrentVoteDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share" element={<Share />} />
        <Route path="/playerlanding" element={<PlayerLanding />} />
        <Route path="/makerlanding" element={<MakerLanding />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default Router;
