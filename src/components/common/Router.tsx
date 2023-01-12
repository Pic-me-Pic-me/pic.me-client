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
import { Result } from '../../pages/Result';
import Share from '../../pages/Share';
import Signup from '../../pages/Signup';
// import Voting from '../../pages/Voting';
import { AuthComponent } from '../Auth';
import MemberInfo from '../Auth/MemberInfo';
import AddAccount from '../Signup/AddAccount';
import KakaoNickname from '../Signup/KakaoNickname';
import Nickname from '../Signup/Nickname';

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MakerLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth/kakao/callback" element={<AuthComponent />} />
        <Route path="/home" element={<Home />} />
        <Route path="/currentvote/:voteid" element={<CurrentVoteDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/current/vote/:voteid" element={<CurrentVoteDetail />} />
        <Route path="/myPage" element={<MemberInfo />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/result/:voteId" element={<Result />} />
        <Route path="/share" element={<Share />} />
        <Route path="/makervoting" element={<MakerVoting />} />
        <Route path="/library" element={<Library />} />
        <Route path="/signup" element={<Signup />}>
          <Route path="" element={<AddAccount />} />
          <Route path="nickname" element={<Nickname />} />
          <Route path="kakaonickname" element={<KakaoNickname />} />
        </Route>
        <Route path="/vote/:voteId" element={<PlayerLanding />} />
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
