import axios from 'axios';

import { VoteData } from '../../types/vote';
import { client } from '../axios';

export const getVoteData = async (voteId: number) => {
  try {
    const { data } = await client.get<VoteData>(`/vote/${voteId}`);
    return data;
  } catch (error) {
    return null;
  }
};
