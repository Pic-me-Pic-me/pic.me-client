import { PicMeResponse } from './api';

// 서버에서 pictures라고 지정해서,,우리는 복수명 안되는데! 어쩔수 없었오!
export interface VotingInfo {
  vote_id: number;
  vote_status: boolean;
  vote_title: string;
  Picture: PictureInfo[];
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
}

export interface GetStickerResultInfo {
  stickerLocation: string;
  emoji: number;
  count: number;
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

export type GetVotingInfo = PicMeResponse<VotingInfo>;
export type GetResultVoting = PicMeResponse<ResultSticker>;
