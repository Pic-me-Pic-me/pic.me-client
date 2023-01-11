import { client } from '../axios';
import { StickerInfo, VoteListData } from './../../types/vote';

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};

export const getCurrentVoteData = async (resCursorId: number) => {
  console.log(resCursorId);
  try {
    const data = await client.get<VoteListData>(`vote/getCurrentVote/${resCursorId}`);
    return data.data.data.result;
  } catch (err) {
    console.error(err);
  }
};

export const postStickerData = (stickerInfo: StickerInfo) => client.post('/sticker', stickerInfo);
