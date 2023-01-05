import { useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { StickerTest } from '../../../asset/image';
import { STICKER_LIST } from '../../../constant/StickerIconList';
import { stickerInfoState } from '../../../recoil/player/atom';
import { StickerLocation } from '../../../types/voting';

const StickerVoting = () => {
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);
  // const s = useResetRecoilState(stickerInfoState);
  // s();
  const { location: stickerList } = stickerVotingInfo;
  const emoji = stickerVotingInfo.emoji;

  const stickerImgRef = useRef<HTMLImageElement>(null);

  const handleAttachSticker = (e: React.MouseEvent<HTMLImageElement>) => {
    if (stickerImgRef.current && stickerList.length !== 3) {
      const { offsetX, offsetY } = e.nativeEvent;

      const newSticker: StickerLocation = {
        x: Math.round((offsetX / 10 - 2.65) * 100) / 100,
        y: Math.round((offsetY / 10 - 2.65) * 100) / 100,
      };
      setStickerVotingInfo((prev) => ({ ...prev, location: [...prev.location, newSticker], emoji }));
    }
  };

  return (
    <>
      <StStickerVotingWrapper>
        <h3>( {3 - stickerList.length}회 남음 )</h3>
        <StStickerImg src={StickerTest} ref={stickerImgRef} alt="selected_img" onClick={handleAttachSticker} />
        {stickerList.map((sticker) => (
          <StEmojiIcon key={sticker.x} location={sticker}>
            {STICKER_LIST[emoji - 1].icon()}
          </StEmojiIcon>
        ))}
      </StStickerVotingWrapper>
    </>
  );
};

export default StickerVoting;

const StStickerVotingWrapper = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  position: relative;

  margin-bottom: 2.6rem;

  z-index: 0;

  & > h3 {
    margin-top: 0.9rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
    ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12}
  }
`;

const StStickerImg = styled.img`
  width: 39rem;
  height: 52rem;
  margin-top: 1.7rem;

  border-radius: 1rem;

  object-fit: cover;
`;
const StEmojiIcon = styled.div<{ location: StickerLocation }>`
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
  }
`;
