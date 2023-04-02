import { AxiosResponse } from 'axios';

import { client } from '../axios';
import { FlowerStickerInfo, PlayerStickerInfo, VoteResultData } from './../../types/vote';

const ACCESS_TOKEN = localStorage.getItem('accessToken');

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/${voteid}`);
  return res;
};

export const getCurrentVoteDatailData = async (voteid: string | undefined) => {
  const { data } = await client.get(`/vote/${voteid}`);
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

export const postFlowerStickerData = async (stickerInfo: PlayerStickerInfo) => {
  const { pictureId, location, emoji, keywordIdx: keyword } = stickerInfo;

  const flowerStickerInfo: FlowerStickerInfo = {
    pictureId,
    location,
    emoji,
    keyword,
  };
  console.log(flowerStickerInfo);
  try {
    const { data } = await client.post('/sticker/flower', stickerInfo);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const postImageNormal = async (imageData: FormData) => {
  try {
    const data = await client.post(`/vote`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export const postImageFlower = async (imageData: FormData) => {
  try {
    const data = await client.post('/flower', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return data.data;
  } catch (e) {
    console.error(e);
  }
};
