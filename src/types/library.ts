export interface VoteInfo {
  id: string;
  title: string;
  count: number;
  url: string;
  createdAt: Date;
}

export interface EndedVoteInfo {
  date: number;
  votes: VoteInfo[];
}
