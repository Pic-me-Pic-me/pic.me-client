import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://ed76eca9-2182-4ba8-9458-3321e7958ab4.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});

interface VoteData {
  status: number;
}
export const getVoteStatus = async (voteId: number) => {
  try {
    const { data } = await client.get<VoteData>(`/vote/${voteId}`);
    console.log(data.status);
    if (data.status === 200) {
      return true;
    }
    if (data.status === 400) {
      return false;
    }
  } catch (error) {
    return false;
  }
};
