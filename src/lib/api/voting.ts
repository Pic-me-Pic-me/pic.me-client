import { AxiosResponse } from 'axios';

import { client } from '../axios';
import { PlayerStickerInfo, VoteResultData } from './../../types/vote';

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  return res;
};

export const getCurrentVoteDatailData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/maker/singleResult/${voteid}`);
  if (data.status === 200) {
    return data.data;
  }
};

export const getCurrentVoteData = async (resCursorId: number) => {
  try {
    const data = await client.get<AxiosResponse<VoteResultData>>(`vote/list/${resCursorId}`);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const postStickerData = async (stickerInfo: PlayerStickerInfo) => {
  try {
    const { data } = await client.post('/sticker', stickerInfo);
    return data;
  } catch (e) {
    console.error(e);
  }
};
