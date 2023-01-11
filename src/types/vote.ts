export interface MakerVoteInfo {
  userName: string;
  voteId: number;
  voteStatus: boolean;
  voteTitle: string;
  Picture: MakerPictureData[];
  currentVote: number;
  createdVdate: Date;
}

export interface MakerPictureData {
  pictureId: number;
  url: string;
  count: number;
  Sticker: GetStickerResultInfo[];
}
export interface StickerLocation {
  x: number;
  y: number;
  degRate: number;
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
  jusStickerCount: number;
}
export interface StickerInfo {
  pictureId: number;
  location: StickerLocation[];
  emoji: number;
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
