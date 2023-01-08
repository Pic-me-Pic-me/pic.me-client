export interface VoteInfo {
  id: number;
  title: string;
  count: number;
  url: string;
  createAt: Date;
}

export interface EndedVoteInfo {
  date: number;
  votes: VoteInfo[];
}
