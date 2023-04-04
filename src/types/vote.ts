import { AxiosResponse } from 'axios';

export interface MakerPictureData {
  pictureId: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
  flower?: number;
  keywords?: number[];
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

export interface MakerFlowerInfo {
  voteId: string;
  voteStatus: boolean;
  voteTitle: string;
  currentVote: number;
  createdDate: Date;
  Picture: FlowerPictureInfo[];
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
export interface CurrentPictureInfo {
  pictureId?: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
}

export interface FlowerPictureInfo {
  pictureId?: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
  flower: number;
  keywords: number[];
}
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
  isFlowerVoting: boolean;
  type?: number;
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
export interface PlayerStickerInfo {
  pictureId: number;
  location: StickerLocation[];
  emoji: number;
  imgViewInfo: NaturalImgInfo;
  isFlowerVoting: boolean;
  keywordIdx?: number;
}
export interface FlowerStickerInfo {
  pictureId: number;
  location: StickerLocation[];
  emoji: number;
  keyword?: number;
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
  type: number;
}
export interface StickerResultInfo {
  stickerLocation: StickerLocation[];
  emoji: number;
  count: number;
  isFlowerVoting?: boolean;
}

export interface NaturalImgInfo {
  width: number;
  height: number;
}

export interface VoteCardInfo {
  voteId: number;
  title: string;
  type: number;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface VoteResultData {
  result: VoteCardInfo[];
  resCursorId: string;
}
export interface VotingAxiosResponse<T> extends AxiosResponse {
  message: string;
}
