// 서버에서 pictures라고 지정해서,,우리는 복수명 안되는데! 어쩔수 없었오!
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

export interface PictureInfo {
  picture_id: number;
  vote_id: number;
  url: string;
  count: number;
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
