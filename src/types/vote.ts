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

export interface GetStickerResultInfo {
  stickerLocation: string;
  emoji: number;
  count: number;
}
