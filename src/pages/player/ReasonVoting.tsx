import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { IcHeaderLogo } from '../../asset/icon';
import { HeaderLayout } from '../../components/Layout';
import { VotingLayout } from '../../components/Layout/player';
import { ReasonSlider } from '../../components/Voting/player';
import { postStickerData } from '../../lib/api/voting';
import { stickerInfoState } from '../../recoil/player/atom';
import { pictureSelector } from '../../recoil/player/selector';

const ReasonVoting = () => {
  const navigate = useNavigate();
  const [stickerVotingInfo, setStickerVotingInfo] = useRecoilState(stickerInfoState);
  const pictureInfo = useRecoilValue(pictureSelector(stickerVotingInfo.pictureId));

  const handleVotingSuccess = async () => {
    try {
      const { data } = await postStickerData(stickerVotingInfo);
      navigate('/player/sticker_voting');
    } catch (e) {
      console.log(e);
    }
  };
  const handlePrevpage = () => {
    navigate('/player/picture_voting');
  };
  return (
    <>
      <HeaderLayout HeaderTitle={<IcHeaderLogo />} handleGoback={handlePrevpage} />
      <VotingLayout
        votingTitle="사진을 선택한 이유를 골라주세요"
        btnTitle="이 사진으로 하기"
        isActiveBtn={true}
        handlePlayer={handleVotingSuccess}>
        {
          <StReasonVotingWrpper>
            <img src={pictureInfo?.url} alt="사진 이유고르기" />
            <ReasonSlider />
          </StReasonVotingWrpper>
        }
      </VotingLayout>
    </>
  );
};

export default ReasonVoting;

const StReasonVotingWrpper = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > img {
    width: 39rem;
    height: 52rem;
    margin-top: 2rem;
    margin-bottom: 1.3rem;

    border-radius: 1rem;
  }
`;
