import { useCallback, useState } from 'react';
import { Area } from 'react-easy-crop/types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { IcClose } from '../../../asset/icon';
import { votingImageState } from '../../../recoil/maker/atom';
import { setCroppedImg } from '../../../utils/setCroppedImg';
import { ImageCrop, ImageInput, TitleInput } from '../../Voting/maker';
import HeaderLayout from '../HeaderLayout';

const MakerVotingLayout = () => {
  const navigate = useNavigate();

  const [isCropToggle, setIsCropToggle] = useState([false, false]);
  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>();

  const { title, imageUrl } = votingForm;
  const copyImageForm = [...imageUrl];

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async (idx: number) => {
    try {
      const crop = (await setCroppedImg(imageUrl[idx], croppedAreaPixels, rotation)) as string;
      copyImageForm[idx] = crop;
      setVotingForm({ ...votingForm, imageUrl: copyImageForm });
      setIsCropToggle(isCropToggle.splice(0, idx, false));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShowCroppedImage = useCallback(async () => {
    if (isCropToggle[0]) {
      handleCropImage(0);
    } else {
      handleCropImage(1);
    }
  }, [croppedAreaPixels, rotation]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVotingForm({ ...votingForm, title: e.target.value });
  };

  const handleCloseModal = () => {
    const closeModal = [...isCropToggle];
    closeModal.forEach((_, idx) => (closeModal[idx] = false));
    setIsCropToggle(closeModal);
  };

  const handleCropImageToggle = (idx: number) => {
    const newCrop = [...isCropToggle];
    newCrop[idx] = true;
    setIsCropToggle(newCrop);
  };

  return (
    <>
      <HeaderLayout HeaderTitle="사진선택" handleGoback={() => navigate('/home')} />
      {(isCropToggle[0] || isCropToggle[1]) && (
        <StImageCropLayoutWrapper>
          <StHeader>
            <StCropTitle>편집하기</StCropTitle>
            <StCloseBtn onClick={handleCloseModal}>
              <IcClose />
            </StCloseBtn>
          </StHeader>
          <StCropDescription>좌우로 위치를 옮겨보세요!</StCropDescription>
          <ImageCrop
            isCrop={isCropToggle}
            handleCropComplete={handleCropComplete}
            setRotation={setRotation}
            rotation={rotation}
          />
          <StFooter>
            <StCropBtn onClick={handleShowCroppedImage}>편집 완료</StCropBtn>
          </StFooter>
        </StImageCropLayoutWrapper>
      )}
      <StMakerVotingLayoutWrapper>
        <TitleInput title={title} handleChangeInput={handleChangeInput} />
        <ImageInput copyImageForm={copyImageForm} handleCropImageToggle={handleCropImageToggle} />
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
  padding: 2.7rem 1.8rem 13.3rem 1.8rem;

  backdrop-filter: blur(5rem);

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
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};

  text-align: center;
`;
const StCropDescription = styled.span`
  margin-top: 7.7rem;
  margin-bottom: 0.7rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
`;
const StFooter = styled.footer`
  width: 100%;
`;
const StCropBtn = styled.button`
  width: 100%;
  height: 5.2rem;
  margin-top: 2.1rem;

  border: none;
  border-radius: 0.754rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}

  cursor: pointer;
  z-index: 100;
`;
