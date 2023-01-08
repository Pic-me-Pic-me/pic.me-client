import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export interface VoteInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  // createdAt: string;
  totalVoteCount: number;
}

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: VoteInfo[];
}

export const getCurrentVoteData = async () => {
  console.log('test');
  try {
    console.log('test2');
    const data = await client.get<VoteListData>('/vote/current');
    console.log('ddd', data.data.data);
    return data.data.data;
  } catch (err) {
    console.error(err);
  }
};
