import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: Result;
}

export interface Result {
  result: VoteInfo[];
  resCursorId: number;
}

export interface VoteInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export const getCurrentVoteData = async (resCursorId: number) => {
  try {
    const data = await client.get<VoteListData>(`/vote/getCurrentVote/${resCursorId}`);
    return data.data.data;
  } catch (err) {
    console.log('실패');
    // console.error(err);
    return;
  }
};
