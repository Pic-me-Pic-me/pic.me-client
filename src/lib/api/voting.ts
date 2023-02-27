import { AxiosResponse } from 'axios';

import { client } from '../axios';
import { StickerInfo, VoteResultData } from './../../types/vote';

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  return res;
};

export const getCurrentVoteDatailData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/${voteid}`);
  if (data.status === 200) {
    return data.data;
  }
};

// export interface VoteInfo {
//   voteId: number;
//   title: string;
//   voteThumbnail: string;
//   createdAt: Date;
//   totalVoteCount: number;
// }

// export interface Result {
//   result: VoteInfo[];
// }

// export interface VoteListData {
//   status: number;
//   success: boolean;
//   message: string;
//   data: Result;
//   resCursorId: number;
// }

export const getCurrentVoteData = async (resCursorId: number) => {
  try {
    const data = await client.get<AxiosResponse<VoteResultData>>(`vote/list/${resCursorId}`);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const postStickerData = (stickerInfo: StickerInfo) => client.post('/sticker', stickerInfo);
