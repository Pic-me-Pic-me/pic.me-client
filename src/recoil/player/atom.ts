import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { StickerInfo, VotingInfo } from './../../types/voting';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

// unique ID 를 가지고 초기 값을 지정해주어야 합니다!
export const votingInfoState = atom<VotingInfo>({
  key: 'votingInfo',
  default: {
    voteId: 0,
    voteStatus: false,
    voteTitle: '',
    picture: [],
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
