import { useRecoilValue } from 'recoil';
import * as timeago from 'timeago.js';
import ko from 'timeago.js/lib/lang/ko';

import { pictureCurrentIdx, pictureResultState, voteResultState } from '../../recoil/maker/atom';
import { CurrentVoteInfoLayout } from './Layout';

const CurrentVoteInfo = () => {
  const voteInfoData = useRecoilValue(voteResultState);
  const pictureResult = useRecoilValue(pictureResultState);
  const currentIdx = useRecoilValue(pictureCurrentIdx);

  const { voteTitle, currentVote, createdDate } = voteInfoData;
  const strCreatedDate = createdDate.toString();

  timeago.register('ko', ko);

  return (
    <CurrentVoteInfoLayout
      voteTitle={voteTitle}
      createdDate={strCreatedDate}
      totalVoteCount={`${currentVote}명 투표 중`}
      currentVoteCount={`${pictureResult[currentIdx].count}표`}
    />
  );
};
export default CurrentVoteInfo;
