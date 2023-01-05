export interface VoteInfo {
  title: string;
  count: number;
  createAt: string;
  url: string;
}

export interface EndedVoteInfo {
  date: string;
  votes: VoteInfo[];
}
