import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcBlackHeaderSecond } from '../../../asset/icon';
import { HeaderLayout, VotingLayout } from '../../../components/Layout/player';
import KeyWordTag from '../../../components/Voting/player/KeyWordTag';
import { BTN_KEY_WORD_TITLE, FLOWER_CONFIRM_REASON, SELECT_KEY_WORD } from '../../../constant/playerInfo';
import { playerStickerInfoState } from '../../../recoil/player/atom';

const KeyWordVoting = () => {
  const navigate = useNavigate();
  const [playerStickerInfo, setPlayerStickerInfo] = useRecoilState(playerStickerInfoState);
  const { keywordIdx } = playerStickerInfo;

  const handleVotingSuccess = () => {
    keywordIdx && navigate('/player/sticker_voting');
  };

  const handlePrevpage = () => {
    navigate(-1);
  };
  const handleTagOverClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLLIElement) && !(e.target instanceof HTMLButtonElement) && keywordIdx === undefined)
      setPlayerStickerInfo({ ...playerStickerInfo, keywordIdx: undefined });
  };

  useEffect(() => {
    setPlayerStickerInfo({ ...playerStickerInfo, keywordIdx: undefined });
  }, []);

  return (
    <div onClick={handleTagOverClick}>
      <HeaderLayout handleGoback={handlePrevpage} IcHeaderSequence={<IcBlackHeaderSecond />} />
      <VotingLayout
        votingTitle={FLOWER_CONFIRM_REASON}
        votingNextLineTitle={SELECT_KEY_WORD}
        pageType="KeyWordVoting"
        btnTitle={BTN_KEY_WORD_TITLE}
        isActiveBtn={keywordIdx === undefined ? false : true}
        handlePlayer={handleVotingSuccess}>
        {
          <StKeyWordVotingWrapper>
            <KeyWordTag />
          </StKeyWordVotingWrapper>
        }
      </VotingLayout>
    </div>
  );
};

export default KeyWordVoting;

const StKeyWordVotingWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;
