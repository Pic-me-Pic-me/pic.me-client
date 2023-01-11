import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Home from '../../pages/Home';
import Library from '../../pages/Library';
import Login from '../../pages/Login';
import MakerLanding from '../../pages/MakerLanding';
import MakerVoting from '../../pages/MakerVoting';
import { PictureVoting, ReasonVoting, ResultVoting, StickerAttachment } from '../../pages/player';
import PlayerLanding from '../../pages/PlayerLanding';
import Share from '../../pages/Share';
import Signup from '../../pages/Signup';
import Error from './Error';

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MakerLanding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share" element={<Share />} />
        <Route path="/makervoting" element={<MakerVoting />} />
        <Route path="/vote/:voteId" element={<PlayerLanding />} />
        <Route path="/player">
          <Route path="picture_voting/:voteid" element={<PictureVoting />} />
          <Route path="reason_voting" element={<ReasonVoting />} />
          <Route path="sticker_voting" element={<StickerAttachment />} />
          <Route path="voting/result" element={<ResultVoting />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default Router;
