import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { PictureId1, PictureId2 } from '../../asset/image';
import { StickerInfo, VotingInfo } from './../../types/voting';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

// unique ID 를 가지고 초기 값을 지정해주어야 합니다!
export const votingInfoState = atom<VotingInfo>({
  key: 'votingInfo',
  default: {
    vote_id: 1,
    vote_status: true,
    vote_title: '햅히를 픽미해주세요💛',
    Picture: [
      { id: 1, url: PictureId1 },
      { id: 2, url: PictureId2 },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
export const stickerInfoState = atom<StickerInfo>({
  key: 'stickerInfo',
  default: {
    pictureId: 0,
    location: [],
    emoji: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
