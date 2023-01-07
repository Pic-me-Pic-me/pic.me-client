import axios from 'axios';

import { VoteData } from '../../types/vote';

export const client = axios.create({
  baseURL: 'https://ed76eca9-2182-4ba8-9458-3321e7958ab4.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});

export const getVoteData = async (voteId: number) => {
  try {
    const { data } = await client.get<VoteData>(`/vote/${voteId}`);
    return data;
  } catch (error) {
    return null;
  }
};
