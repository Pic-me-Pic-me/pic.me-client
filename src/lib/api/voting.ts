import { client } from '../axios';
import { PlayerStickerInfo } from './../../types/vote';

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

export const postStickerData = async (stickerInfo: PlayerStickerInfo) => {
  try {
    const { data } = await client.post('/sticker', stickerInfo);
    return data;
  } catch (e) {
    console.error(e);
  }
};
