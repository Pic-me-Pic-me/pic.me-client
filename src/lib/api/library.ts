import { client } from '../axios';

export const getLibraryInfo = async () => {
  try {
    const res = await client.get(`/vote/all`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
