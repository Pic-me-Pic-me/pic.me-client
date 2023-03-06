import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { PictureId1, PictureId2 } from '../../asset/image';
import { PlayerStickerInfo, VoteInfo } from '../../types/vote';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

// unique ID 를 가지고 초기 값을 지정해주어야 합니다!
export const votingInfoState = atom<VoteInfo>({
  key: 'votingInfo',
  default: {
    userName: 'Happhee',
    voteId: 1,
    voteStatus: true,
    voteTitle: '햅히를 픽미해주세요💛',
    Picture: [
      { id: 1, url: PictureId1 },
      { id: 2, url: PictureId2 },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
export const playerStickerInfoState = atom<PlayerStickerInfo>({
  key: 'playerStickerInfo',
  default: {
    pictureId: 0,
    location: [],
    emoji: 0,
    imgViewInfo: { width: 0, height: 0 },
  },
  effects_UNSTABLE: [persistAtom],
});
