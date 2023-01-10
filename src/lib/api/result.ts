import { client } from '../axios';

export const getResultData = (voteId: number) => {
  try {
    const res = client.get(`/vote/admin/${voteId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
