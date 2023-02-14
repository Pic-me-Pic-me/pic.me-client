import { client } from '../axios';

//투표 삭제
export const deleteVote = async (id: string) => {
  try {
    const res = await client.delete(`/vote/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
