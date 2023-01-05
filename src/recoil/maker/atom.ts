import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { VotingImageInfo } from '../../types/votingImage';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

export const votingImageState = atom<VotingImageInfo>({
  key: 'votingForm',
  default: {
    title: '',
    firstImageUrl: '',
    secondImageUrl: '',
  },
  effects_UNSTABLE: [persistAtom],
});
