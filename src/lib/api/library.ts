import { client } from '../axios';

export const getLibraryInfo = async (flag: number, date: number) => {
  try {
    const res = await client.get(`/vote/left?flag=${flag}&date=${date}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getAllVoteInfo = async (flag: number) => {
  try {
    const res = await client.get(`/vote/all?flag=${flag}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
