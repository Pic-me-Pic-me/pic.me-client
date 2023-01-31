import { client } from '../axios';

//가로 무한 스크롤
export const getMonthlyLibraryInfo = async (flag: number, date: number) => {
  try {
    const res = await client.get(`/vote/left?flag=${flag}&date=${date}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//세로 무한 스크롤
export const getAllVoteInfo = async (flag: number) => {
  try {
    const res = await client.get(`/vote/all?flag=${flag}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

//투표 삭제
export const deleteVote = async (id: number) => {
  try {
    const res = await client.delete(`/vote/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
