import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcReasonBtnBefore } from '../../asset/icon';
import { STICKER_LIST } from '../../constant/StickerIconList';
import { stickerResultState } from '../../recoil/maker/atom';
import { NaturalImgInfo, StickerLocation, StickerResultInfo } from '../../types/vote';
import { setStickerLocationData } from '../../utils/setStickerLocationData';

interface ReasonPicProps {
  src: string;
}
const ResultPicture = (props: ReasonPicProps) => {
  const { src } = props;
  const [imgInfo, setImgInfo] = useState<NaturalImgInfo>();
  const stickerResult = useRecoilValue(stickerResultState);
  const [imgViewInfo, setImgViewInfo] = useState<NaturalImgInfo>();

  const handleImgSize = (e: React.SyntheticEvent) => {
    const { naturalWidth, naturalHeight, width, height } = e.target as HTMLImageElement;
    setImgViewInfo({ width, height });
    setImgInfo({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <>
      <StPictureWrapper>
        <StPicture src={src} onLoad={handleImgSize} />
        {stickerResult.map(({ stickerLocation, emoji }, idx) =>
          stickerLocation.map((sticker, stickerIdx) => (
            <StEmojiIconWrapper
              key={`sticker${stickerIdx}_${emoji}`}
              location={setStickerLocationData(sticker, imgViewInfo, imgInfo)}>
              {STICKER_LIST[emoji].icon()}
            </StEmojiIconWrapper>
          )),
        )}
      </StPictureWrapper>
    </>
  );
};

const StPictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 87%;
  margin-top: 2.3rem;
  overflow: hidden;

  > svg {
    position: absolute;
    bottom: -3rem;
  }
`;

const StPicture = styled.img<{ src: string }>`
  width: 100%;
  height: 48.836rem;

  object-fit: cover;
`;
const StEmojiIconWrapper = styled.div<{ location: StickerLocation }>`
  position: absolute;
  left: ${({ location }) => location.x}rem;
  top: ${({ location }) => location.y}rem;
  & > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 5.3rem;
    height: 5.3rem;
    z-index: 3;
    transform-origin: 50% 50%;
    transform: ${({ location }) => `rotate(${location.degRate}deg)`};
  }
`;
export default ResultPicture;
