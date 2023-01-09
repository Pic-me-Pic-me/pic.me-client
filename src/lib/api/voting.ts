import useSWR from 'swr';

import { client } from '../axios';
import { VoteInfoProps, VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const getCurrentVoteData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/maker/singleResult/${voteid}`);
  if (data.status === 200) {
    console.log(data.data);
    return data.data;
  }
};

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};
