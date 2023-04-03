import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import {
  FlowerPictureInfo,
  MakerFlowerInfo,
  MakerPictureData,
  MakerVoteInfo,
  StickerResultInfo,
} from '../../types/vote';
import { VotingImageInfo } from '../../types/votingImage';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

export const votingImageState = atom<VotingImageInfo>({
  key: 'votingImage',
  default: {
    title: '',
    imageUrl: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const voteResultState = atom<MakerVoteInfo>({
  key: 'voteResult',
  default: {
    userName: '',
    voteId: 0,
    voteStatus: true,
    voteTitle: '',
    Picture: [],
    currentVote: 0,
    createdDate: new Date(),
  },
  effects_UNSTABLE: [persistAtom],
});

export const flowerResultState = atom<MakerVoteInfo>({
  key: 'flowerResult',
  default: {
    userName: '',
    voteId: 0,
    voteStatus: true,
    voteTitle: '',
    Picture: [],
    currentVote: 0,
    createdDate: new Date(),
  },
  effects_UNSTABLE: [persistAtom],
});

export const pictureResultState = atom<MakerPictureData[]>({
  key: 'pictureResult',
  default: [
    {
      Sticker: [],
      count: 0,
      pictureId: 0,
      url: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const flowerPictureState = atom<MakerPictureData[]>({
  key: 'flowerPictureResult',
  default: [
    {
      Sticker: [],
      count: 0,
      pictureId: 0,
      url: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

// export const flowerPictureResultState = atom<FlowerPictureInfo[]>({
//   key: 'flowerPictureResult',
//   default: [
//     {
//       Sticker: [],
//       count: 0,
//       pictureId: 0,
//       url: '',
//       flower: 0,
//       keywords: [],
//     },
//   ],
//   effects_UNSTABLE: [persistAtom],
// });

export const pictureCurrentIdx = atom<number>({
  key: 'pictureCurrentIdx',
  default: 0,
});

export const stickerResultState = atom<StickerResultInfo[]>({
  key: 'stickerResult',
  default: [
    {
      stickerLocation: [],
      emoji: 0,
      count: 0,
      isFlowerVoting: true,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
