import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import StatusBarForiOS from './StatusBarForiOS';

const CurrentVoteDetail = lazy(() => import('../../pages/CurrentVoteDetail'));
const Error404 = lazy(() => import('../../pages/Error404'));
const Home = lazy(() => import('../../pages/Home'));
const Library = lazy(() => import('../../pages/Library'));
const Login = lazy(() => import('../../pages/Login'));
const Onboarding = lazy(() => import('../../pages/Onboarding'));
const MakerVoting = lazy(() => import('../../pages/MakerVoting'));
const PictureVoting = lazy(() => import('../../pages/player/PictureVoting'));
const ReasonVoting = lazy(() => import('../../pages/player/ReasonVoting'));
const ResultVoting = lazy(() => import('../../pages/player/ResultVoting'));
const KeyWordVoting = lazy(() => import('../../pages/player/flower/KeyWordVoting'));
const StickerAttachment = lazy(() => import('../../pages/player/StickerAttachment'));
const PlayerLanding = lazy(() => import('../../pages/PlayerLanding'));
const Result = lazy(() => import('../../pages/Result'));
const Share = lazy(() => import('../../pages/Share'));
const Signup = lazy(() => import('../../pages/Signup'));
const Auth = lazy(() => import('../Auth/Auth'));
const MemberInfo = lazy(() => import('../Auth/MemberInfo'));
const AddAccount = lazy(() => import('../Signup/AddAccount'));
const Nickname = lazy(() => import('../Signup/Nickname'));

const Router = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Suspense>
        <StatusBarForiOS />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth/kakao/callback" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/current/vote/:voteid" element={<CurrentVoteDetail />} />
          <Route path="/myPage" element={<MemberInfo />} />
          <Route path="/library" element={<Library />} />
          <Route path="/result/:voteId" element={<Result />} />
          <Route path="/share" element={<Share />} />
          <Route path="/makervoting" element={<MakerVoting />} />
          <Route path="/library" element={<Library />} />
          <Route path="/signup" element={<Signup />}>
            <Route path="" element={<AddAccount />} />
            <Route path="nickname" element={<Nickname />} />
          </Route>
          <Route path="/vote/:voteId" element={<PlayerLanding />}>
            <Route path="*" element={<Error404 />} />
          </Route>
          <Route path="/player">
            <Route path="picture_voting/:voteid" element={<PictureVoting />} />
            <Route path="reason_voting" element={<ReasonVoting />} />
            <Route path="sticker_voting" element={<StickerAttachment />} />
            <Route path="voting/result" element={<ResultVoting />} />
            <Route path="flower">
              <Route path="keyword_voting" element={<KeyWordVoting />} />
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  </BrowserRouter>
);

export default Router;
