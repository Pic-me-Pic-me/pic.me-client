import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { StickerResultInfo } from '../../types/vote';
import { VotingImageInfo } from '../../types/votingImage';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();
export const stickerResultState = atom<StickerResultInfo[]>({
  key: 'stickerResult',
  default: [
    {
      stickerLocation: [],
      emoji: 0,
      count: 0,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const votingImageState = atom<VotingImageInfo>({
  key: 'votingImage',
  default: {
    title: '',
    firstImageUrl: '',
    secondImageUrl: '',
  },
  effects_UNSTABLE: [persistAtom],
});
