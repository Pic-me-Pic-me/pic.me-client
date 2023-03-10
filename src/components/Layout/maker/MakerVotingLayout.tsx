import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop/types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcClose } from '../../../asset/icon';
import useModal from '../../../lib/hooks/useModal';
import { votingImageState } from '../../../recoil/maker/atom';
import { setCroppedImg } from '../../../utils/setCroppedImg';
import Modal from '../../common/Modal';
import { ImageCrop, ImageInput, TitleInput } from '../../Voting/maker';
import HeaderLayout from '../HeaderLayout';

const MakerVotingLayout = () => {
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();

  const [isCropToggle, setIsCropToggle] = useState({
    firstCrop: false,
    secondCrop: false,
  });
  const [isToggle, setIsToggle] = useState({
    firstToggle: true,
    secondToggle: true,
  });

  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>();

  const { title, firstImageUrl, secondImageUrl } = votingForm;
  const { firstCrop, secondCrop } = isCropToggle;
  const { firstToggle, secondToggle } = isToggle;

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleShowCroppedImage = useCallback(async () => {
    setIsCropToggle({ firstCrop: false, secondCrop: false });
    setIsToggle({ firstToggle: true, secondToggle: true });

    if (firstCrop) {
      try {
        const crop = (await setCroppedImg(firstImageUrl, croppedAreaPixels, rotation)) as string;
        setVotingForm({ ...votingForm, firstImageUrl: crop });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const crop = (await setCroppedImg(secondImageUrl, croppedAreaPixels, rotation)) as string;
        setVotingForm({ ...votingForm, secondImageUrl: crop });
      } catch (e) {
        console.error(e);
      }
    }
  }, [croppedAreaPixels, rotation]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVotingForm({ ...votingForm, title: e.target.value });
  };

  const handleCloseModal = () => {
    setIsCropToggle({ firstCrop: false, secondCrop: false });
  };

  const handleCropImageToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      switch (target.value) {
        case 'firstCrop':
          setIsCropToggle({ firstCrop: !firstCrop, secondCrop: false });
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          break;
        case 'secondCrop':
          setIsCropToggle({ firstCrop: false, secondCrop: !secondCrop });
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          break;
      }
    }
  };

  const handleToggleModify = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      switch (target.value) {
        case 'firstModify':
          setIsToggle({ ...isToggle, firstToggle: !firstToggle });
          break;
        case 'secondModify':
          setIsToggle({ ...isToggle, secondToggle: !secondToggle });
          break;
      }
    }
  };

  const handlePrevPage = () => {
    setVotingForm({ title: '', firstImageUrl: '', secondImageUrl: '' });
    navigate('/home');
  };

  return (
    <>
      <Modal
        isShowing={isShowing}
        message="??? ???????????? ????????? ???????????? ????????????"
        handleHide={toggle}
        handleConfirm={handlePrevPage}
      />
      <HeaderLayout HeaderTitle="???????????????" handleGoback={() => toggle()} />
      {(firstCrop || secondCrop) && (
        <StImageCropLayoutWrapper>
          <StHeader>
            <StCropTitle>????????????</StCropTitle>
            <StCloseBtn onClick={handleCloseModal}>
              <IcClose />
            </StCloseBtn>
          </StHeader>
          <ImageCrop
            firstCrop={firstCrop}
            handleCropComplete={handleCropComplete}
            setRotation={setRotation}
            rotation={rotation}
          />
          <StCropDescription>????????? ????????? ???????????????!</StCropDescription>
          <StFooter>
            <StCropBtn onClick={handleShowCroppedImage}>??????</StCropBtn>
          </StFooter>
        </StImageCropLayoutWrapper>
      )}
      <StMakerVotingLayoutWrapper>
        <TitleInput title={title} handleChangeInput={handleChangeInput} />
        <ImageInput
          handleCropImageToggle={handleCropImageToggle}
          handleToggleModify={handleToggleModify}
          isToggle={isToggle}
        />
      </StMakerVotingLayoutWrapper>
    </>
  );
};

export default MakerVotingLayout;

const StMakerVotingLayoutWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
  margin-top: 2.2rem;
`;

const StImageCropLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 85rem;
  padding: 7.5rem 3.1rem 13.3rem 3.1rem;

  backdrop-filter: blur(7rem);

  z-index: 100;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 2.4rem;

  svg {
    pointer-events: none;
  }
`;
const StCloseBtn = styled.button`
  position: absolute;
  right: 0;

  border: none;
  background-color: transparent;

  z-index: 100;
`;
const StCropTitle = styled.h1`
  ${({ theme }) => theme.fonts.Pic_Subtitle1_Pretendard_Semibold_20}

  text-align: center;
`;
const StCropDescription = styled.span`
  margin-top: 1.6rem;

  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}
`;
const StFooter = styled.footer`
  width: 100%;
`;
const StCropBtn = styled.button`
  width: 100%;
  height: 5.8rem;
  margin-top: 2.1rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  cursor: pointer;
  z-index: 100;
`;
