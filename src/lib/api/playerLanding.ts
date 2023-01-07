import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://ed76eca9-2182-4ba8-9458-3321e7958ab4.mock.pstmn.io',
  headers: {
    'Content-type': 'application/json',
  },
});

export interface VoteInfo {
  // username: string;
  vote_id: number;
  vote_status: boolean;
  vote_title: string;
  Picture: PictureData[];
}

export interface PictureData {
  picture_id: number;
  url: string;
}

export interface VoteData {
  status: number;
  data: VoteInfo;
}

export const getVoteStatus = async (voteId: number) => {
  try {
    const { data } = await client.get<VoteData>(`/vote/${voteId}`);
    console.log(data.status);
    if (data.status === 200) {
      return data.data;
    }
    if (data.status === 400) {
      return false;
    }
  } catch (error) {
    return false;
  }
};
