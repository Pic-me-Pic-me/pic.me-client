import { client } from '../axios';
import { StickerInfo } from './../../types/vote';

export const patchCurrentVoteData = async (voteid: string | undefined) => {
  const res = await client.patch(`/vote/close/${voteid}`);
  console.log(res);
  return res;
};

export interface VoteInfo {
  voteId: number;
  title: string;
  voteThumbnail: string;
  createdAt: Date;
  totalVoteCount: number;
}

export interface Result {
  result: VoteInfo[];
}

export interface VoteListData {
  status: number;
  success: boolean;
  message: string;
  data: Result;
  resCursorId: number;
}

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
