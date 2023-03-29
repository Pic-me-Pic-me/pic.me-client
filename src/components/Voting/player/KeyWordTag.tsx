import { useRecoilState } from 'recoil';
import styled, { ThemeContext } from 'styled-components';

import { IcChoice } from '../../../asset/icon';
import { FLOWER_ICON_LIST } from '../../../constant/FlowerIconList';
import { TAG_LIST } from '../../../constant/playerInfo';
import { playerStickerInfoState } from '../../../recoil/player/atom';

const KeyWordTag = () => {
  const [playerStickerInfo, setPlayerStickerInfo] = useRecoilState(playerStickerInfoState);
  const { emoji } = playerStickerInfo;

  const handleKeyWordTag = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const selectTag = e.target.textContent;
      if (selectTag) {
        const selectTagIdx = TAG_LIST[emoji].indexOf(selectTag);
        setPlayerStickerInfo({ ...playerStickerInfo, keywordIdx: selectTagIdx });
      }
    }
  };

  return (
    <StKeyWordTagWrapper>
      {FLOWER_ICON_LIST[emoji].icon(window.screen.width * 0.6)}
      <h5>{FLOWER_ICON_LIST[emoji].name}</h5>
      <StKeyWordUl liColor={FLOWER_ICON_LIST[emoji].color}>
        {TAG_LIST[emoji].map((tagData) => (
          <li key={tagData} onClick={handleKeyWordTag}>
            <IcChoice />
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

const StKeyWordUl = styled.ul<{ liColor: string }>`
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
      color: ${({ theme }) => theme.colors.Pic_Color_White};
      background-color: ${({ liColor }) => liColor};
    }
  }
`;
