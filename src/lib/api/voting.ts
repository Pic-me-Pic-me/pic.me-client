import useSWR from 'swr';

import { client } from '../axios';
import { VoteInfoProps, VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const getCurrentVoteData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/maker/singleResult/${voteid}`);
  if (data.status === 200) {
    return data.data;
  }
};

// export interface ResponseDto {
//   message: string;
//   status: number;
//   success: boolean;
// }

// export interface Response<T> extends ResponseDto {
//   data: { data: T };
// }

// export const useGetCurrentVoteData = (voteid: string | undefined) => {
//   const { data } = useSWR(`/vote/maker/singleResult/${voteid}`, client.get);
//   return data;
// };

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};
