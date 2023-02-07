import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { VoteResultData } from '../../types/vote';
import { picmeGetFetcher } from '../axios';

const getKey = (cursorIdx: number, voteListData: AxiosResponse<VoteResultData>) => {
  // console.log('getKey', cursorIdx, voteListData);

  if (cursorIdx === 0) return `vote/list/${cursorIdx}`;
  if (voteListData) return `vote/list/${voteListData.data.resCursorId}`;
  return `vote/list/${cursorIdx}`;
};
const useGetCurrentVoteList = () => {
  const { data, error, size, setSize } = useSWRInfinite<AxiosResponse<VoteResultData>>(getKey, picmeGetFetcher, {
    errorRetryCount: 3,
  });
  // console.log('useGet', data);

  const parseData = data?.map((item) => item.data);

  // console.log('parseDaa', parseData);
  // console.log(parseData?.map((item) => item.result));

  const parseResultList = parseData
    ?.map((item) => item.result)
    .flat()
    .filter((result) => result);

  const parseCursorIdList = parseData
    ?.map((item) => item.resCursorId)
    .flat()
    .filter((resCursorId) => resCursorId);

  // console.log('parseResultList', parseResultList);
  // console.log('parseCursorIdList', parseCursorIdList);

  return {
    voteListResult: {
      result: parseResultList ? parseResultList : [],
      resCursorId: parseCursorIdList ? parseCursorIdList[parseCursorIdList.length - 1] : '',
    },
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};

export default useGetCurrentVoteList;
