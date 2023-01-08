import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const getCurrentVoteData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/admin/${voteid}`);
  if (data.status === 200) {
    return data;
  }
};

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  return res;
};
