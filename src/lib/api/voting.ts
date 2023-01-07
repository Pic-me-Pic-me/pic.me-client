import { client } from '../axios';
import { VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const getCurrentVoteData = async () => {
  const { data } = await client.get('/vote/admin/1');
  if (data.status === 200) {
    return data;
  }
};

export const deleteCurrentVoteData = async () => {
  const res = await client.delete('/vote/close/1');
  return res;
};
