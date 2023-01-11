import { PicMeResponse } from './api';

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
