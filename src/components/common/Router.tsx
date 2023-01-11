import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import CurrentVoteDetail from '../../pages/CurrentVoteDetail';
import Error404 from '../../pages/Error404';
import Home from '../../pages/Home';
import Library from '../../pages/Library';
import Login from '../../pages/Login';
import MakerLanding from '../../pages/MakerLanding';
import MakerVoting from '../../pages/MakerVoting';
import { PictureVoting, ReasonVoting, ResultVoting, StickerAttachment } from '../../pages/player';
import PlayerLanding from '../../pages/PlayerLanding';
import Share from '../../pages/Share';
import Signup from '../../pages/Signup';
import Voting from '../../pages/Voting';
import { AuthComponent } from '../Auth';
import Nickname from '../Auth/Nickname';

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currentvote/:voteid" element={<CurrentVoteDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth/kakao/callback" element={<AuthComponent />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/voting" element={<Voting />} /> */}
        <Route path="/share" element={<Share />} />
        <Route path="/makervoting" element={<MakerVoting />} />
        <Route path="/vote/:voteId" element={<PlayerLanding />} />
        <Route path="/makerlanding" element={<MakerLanding />} />
        <Route path="/player">
          <Route path="picture_voting/:voteid" element={<PictureVoting />} />
          <Route path="reason_voting" element={<ReasonVoting />} />
          <Route path="sticker_voting" element={<StickerAttachment />} />
          <Route path="voting/result" element={<ResultVoting />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default Router;
