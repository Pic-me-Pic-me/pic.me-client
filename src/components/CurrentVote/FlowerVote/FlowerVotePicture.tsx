import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { StickerAttachFlowerImg } from '../../../components/common';
import { patchCurrentVoteData } from '../../../lib/api/voting';
import { pictureResultState } from '../../../recoil/maker/atom';

const FlowerVotePicture = () => {
  const { voteid: voteId } = useParams<{ voteid: string }>();
  const flowerPictureData = useRecoilValue(pictureResultState);
  const voteInfoWrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (flowerPictureData[0].count === 10) {
      patchCurrentVoteData(voteId);
    }
  }, [flowerPictureData, voteId]);

  return (
    <StickerAttachFlowerImg
      stickerAttachImgSrc={flowerPictureData[0].url}
      imgWrapperWidthPercent={100}
      imgHight={45.3}
      imgViewInfo={{
        width: voteInfoWrapperRef.current?.clientWidth ? voteInfoWrapperRef.current?.clientWidth : 0,
        height: 453,
      }}
    />
  );
};

export default FlowerVotePicture;
