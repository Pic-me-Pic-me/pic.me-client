import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { ThemeContext } from 'styled-components';

import { IcChoice } from '../../../asset/icon';
import { FLOWER_ICON_LIST } from '../../../constant/FlowerIconList';
import { LILY, ROSE, TAG_LIST } from '../../../constant/playerInfo';
import { playerStickerInfoState } from '../../../recoil/player/atom';

const KeyWordTag = () => {
  const [playerStickerInfo, setPlayerStickerInfo] = useRecoilState(playerStickerInfoState);
  const [selectTagIdx, setSelectTagIdx] = useState(0);
  const { emoji } = playerStickerInfo;

  const handleKeyWordTag = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const selectTag = e.target.textContent;
      if (selectTag) {
        const currentTagIdx = TAG_LIST[emoji].indexOf(selectTag);
        setPlayerStickerInfo({ ...playerStickerInfo, keywordIdx: currentTagIdx });
        setSelectTagIdx(currentTagIdx);
      }
    }
  };

  return (
    <StKeyWordTagWrapper>
      {FLOWER_ICON_LIST[emoji].icon(window.screen.width * 0.6)}
      <h5>{FLOWER_ICON_LIST[emoji].name}</h5>
      <StKeyWordUl liColor={FLOWER_ICON_LIST[emoji].color} flowerType={FLOWER_ICON_LIST[emoji].id}>
        {TAG_LIST[emoji].map((tagData, idx) => (
          <li key={tagData} onClick={handleKeyWordTag}>
            {selectTagIdx === idx && (
              <IcChoice
                stroke={
                  FLOWER_ICON_LIST[emoji].id === ROSE || FLOWER_ICON_LIST[emoji].id === LILY ? '#ffffff' : '#FFFDC2'
                }
              />
            )}
            {tagData}
          </li>
        ))}
      </StKeyWordUl>
    </StKeyWordTagWrapper>
  );
};

export default KeyWordTag;

const StKeyWordTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h5 {
    margin-top: 3rem;

    color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
    ${({ theme }) => theme.fonts.Pic_Noto_SB_Title_2};
  }
`;

const StKeyWordUl = styled.ul<{ liColor: string; flowerType: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
  column-gap: 0.6rem;
  row-gap: 1.2rem;

  width: 27.5rem;
  margin-top: 1.6rem;
  margin-bottom: 4.2rem;

  & > li {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 8.643rem;
    height: 3.078rem;

    border: 0.102895rem solid ${({ liColor }) => liColor};
    border-radius: 3.22273rem;
    color: ${({ liColor }) => liColor};
    ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}

    text-align: center;

    & > svg {
      position: absolute;
      left: 0.7rem;

      z-index: 3;
    }
    :hover {
      color: ${({ flowerType, theme }) =>
        flowerType === ROSE || flowerType === LILY ? theme.colors.Pic_Color_White : theme.colors.Pic_Color_Yellow};
      background-color: ${({ liColor }) => liColor};
    }
  }
`;
