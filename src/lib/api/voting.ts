import { client } from '../axios';
import { VoteListData, VotingInfo } from './../../types/voting';

export const postVoteData = (votingData: VotingInfo, token?: string) => client.post('/vote', votingData);

export const getCurrentVoteData = async (resCursorId: number) => {
  try {
    const data = await client.get<VoteListData>(`/vote/getCurrentVote/${resCursorId}`);
    return data.data.data;
  } catch (err) {
    console.error(err);
    return;
  }
};
