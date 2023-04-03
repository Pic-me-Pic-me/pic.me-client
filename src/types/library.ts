export interface VoteInfo {
  id: string;
  title: string;
  count: number;
  url: string;
  createdAt: Date;
  type: number;
}

export interface EndedVoteInfo {
  dates: number[];
}
