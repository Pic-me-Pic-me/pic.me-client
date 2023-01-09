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
}
export interface StickerLocation {
  x: number;
  y: number;
}

export interface StickerInfo {
  pictureId: number;
  location: StickerLocation[];
  emoji: number;
}

export type GetVotingInfo = PicMeResponse<VotingInfo>;
