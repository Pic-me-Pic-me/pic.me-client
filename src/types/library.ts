export interface VoteInfo {
  id: number;
  title: string;
  count: number;
  url: string;
  createdAt: Date;
}

export interface EndedVoteInfo {
  date: number;
  votes: VoteInfo[];
}
