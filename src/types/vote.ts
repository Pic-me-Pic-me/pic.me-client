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

export interface VoteData {
  status: number;
  data: VoteInfo;
}

export interface VoteProps {
  vote: VoteInfo;
}
