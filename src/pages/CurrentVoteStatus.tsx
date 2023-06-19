import { useLocation } from 'react-router-dom';

import { FlowerVoteStatus, OriginVoteStatus } from '../components/CurrentVote';

const CurrentVoteStatus = () => {
  const location = useLocation();
  const isFlower = location.state;

  return <>{isFlower ? <FlowerVoteStatus /> : <OriginVoteStatus />}</>;
};

export default CurrentVoteStatus;
