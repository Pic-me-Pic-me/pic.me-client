import { useState } from 'react';

import ShareLayout from '../components/Share/Layout/ShareLayout';

const Share = () => {
  const [isFlowerVote, setIsFlowerVote] = useState<boolean>(true);

  return <ShareLayout isFlowerVote={isFlowerVote} />;
};

export default Share;
