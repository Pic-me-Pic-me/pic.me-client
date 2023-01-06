import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export interface VoteListInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface VoteList {
  date: string;
  votes: VoteListInfo;
}

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: VoteList;
}

export const getCurrentVoteData = async () => {
  try {
    const { data } = await client.get<VoteListData>('/vote/all');
    console.log(data.data.votes);
    return data.data.votes;
  } catch (err) {
    console.error(err);
  }
};
