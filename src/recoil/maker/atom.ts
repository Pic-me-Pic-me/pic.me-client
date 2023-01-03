import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface VotingImage {
  firstImageUrl: string;
  secondImageUrl: string;
}
//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();
export const votingImageState = atom<VotingImage>({
  key: 'votingImage',
  default: {
    firstImageUrl: '',
    secondImageUrl: '',
  },
  effects_UNSTABLE: [persistAtom],
});
