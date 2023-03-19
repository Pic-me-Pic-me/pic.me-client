import { useRecoilValue } from 'recoil';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

import { pictureCurrentIdx, pictureResultState, voteResultState } from '../../recoil/maker/atom';
import CurrentVoteInfoLayout from './Layout/CurrentVoteInfoLayout';

const CurrentVoteInfo = () => {
  const voteInfoData = useRecoilValue(voteResultState);
  const pictureResult = useRecoilValue(pictureResultState);
  const currentIdx = useRecoilValue(pictureCurrentIdx);

  timeago.register('ko', ko);
  const strCreateDate = voteInfoData.createdDate.toString();

  return (
    <CurrentVoteInfoLayout
      voteTitle={voteInfoData.voteTitle}
      createdAt={strCreateDate}
      totalVoteCount={`${voteInfoData.currentVote}명 투표 중`}
      currentVoteCount={`${pictureResult[currentIdx].count}표`}
    />
  );
};
export default CurrentVoteInfo;
