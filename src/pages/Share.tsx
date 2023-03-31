import { useLocation } from 'react-router-dom';

import ShareLayout from '../components/Share/Layout/ShareLayout';

const Share = () => {
  const location = useLocation();

  const isFlowerVote = location.state.isFlowerVote;

  return <ShareLayout isFlowerVote={isFlowerVote} />;
};

export default Share;
