import { client } from '../axios';

//세로 무한 스크롤
export const getAllVoteInfo = async (flag: string) => {
  try {
    const res = await client.get(`/vote/library/scroll/all?flag=${flag}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//투표 삭제
export const deleteVote = async (id: string) => {
  try {
    const res = await client.delete(`/vote/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
