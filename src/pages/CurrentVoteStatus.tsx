import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { OriginVoteStatus } from '../components/CurrentVote';

const CurrentVoteStatus = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isFlower = location.state;

  return <>{isFlower ? <></> : <OriginVoteStatus />}</>;
};

export default CurrentVoteStatus;
