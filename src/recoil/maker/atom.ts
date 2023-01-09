import { PictureProps, VoteInfoProps } from './../../types/voting';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

export const currentVoteInfoState = atom<VoteInfoProps>({
  key: 'currnetVoteInfo',
  default: {
    voteId: 0,
    voteStatus: true,
    voteTitle: '',
    currentVote: 0,
    // createDate: new Date(0),
    Picture: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const pictureInfoState = atom<PictureProps>({
  key: 'pictureInfo',
  default: {
    pictureId: 0,
    url: '',
    count: 0,
    Sticker: [],
  },
});
