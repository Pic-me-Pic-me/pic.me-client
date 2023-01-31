// 서버에서 pictures라고 지정해서,,우리는 복수명 안되는데! 어쩔수 없었오!
import { PicMeResponse } from './api';

export interface MakerPictureData {
  pictureId: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
}

export interface MakerVoteInfo {
  userName?: string;
  voteId: number;
  voteStatus: boolean;
  voteTitle: string;
  Picture: MakerPictureData[];
  currentVote: number;
  createdDate: Date;
}

export interface VotingInfo {
  vote_id: number;
  user_id: number;
  vote_status: boolean;
  vote_title: string;
  pictures: string[];
  current_vote: number;
  maximum_vote: number;
  created_date: Date;
}

// export interface PictureInfo {
//   picture_id: number;
//   vote_id: number;
//   url: string;
//   count: number;
// }

// export interface StickerInfo {
//   sticker_id: number;
//   picture_id: number;
//   location: string;
//   emoji: number;
// }

export interface CurrentPictureInfo {
  pictureId?: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
}

// export interface StickerResultInfo {
//   stickerLocation: StickerLocation[];
//   emoji: number;
//   count: number;
// }
// export interface GetStickerResultInfo {
//   stickerLocation: string;
//   emoji: number;
//   count: number;
// }
export interface VoteData {
  status: number;
  data?: VoteInfo;
}

export interface VoteInfo {
  userName: string;
  voteId: number;
  voteStatus: boolean;
  voteTitle: string;
  Picture: PictureData[];
}

export interface PictureData {
  id: number;
  url: string;
}

export interface VoteProps {
  vote: VoteInfo;
}

export interface PictureInfo {
  id: number;
  url: string;
  count?: number;
}

export interface StickerLocation {
  x: number;
  y: number;
  degRate: number;
}
export interface StickerInfo {
  pictureId: number;
  location: StickerLocation[];
  emoji: number;
  imgViewInfo: NaturalImgInfo;
}

export interface GetStickerResultInfo {
  stickerLocation: string;
  emoji: number;
  count: number;
}

export interface VoteReasonInfo {
  totalVote: number;
  bestReason: string;
  bestReasonVote: number;
  faceStickerCount: number;
  angleStickerCount: number;
  moodStickerCount: number;
  justStickerCount: number;
}

export interface ResultSticker {
  Picture: PictureInfo;
  Sticker: GetStickerResultInfo[];
}
export interface StickerResultInfo {
  stickerLocation: StickerLocation[];
  emoji: number;
  count: number;
}

export interface NaturalImgInfo {
  width: number;
  height: number;
}

export interface VoteCardInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface VoteResultData {
  result: VoteCardInfo[];
  resCursorId: number;
}
