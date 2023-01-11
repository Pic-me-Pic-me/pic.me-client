import useSWR from 'swr';
import { VotingInfo } from '../../types/vote';
import qs from 'qs';
import { client } from '../axios';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};

export interface VoteInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface Result {
  result: VoteInfo[];
}

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: Result;
  resCursorId: number;
}

export const getCurrentVoteData = async (resCursorId: number) => {
  console.log(resCursorId);
  try {
    const data = await client.get<VoteListData>(`vote/getCurrentVote/${resCursorId}`);
    return data.data.data.result;
  } catch (err) {
    console.error(err);
  }
};
