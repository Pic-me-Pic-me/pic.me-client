import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { postImage } from '../../../lib/api/voting';
import { votingImageState } from '../../../recoil/maker/atom';
import { setDataURLtoFile } from '../../../utils/setDataURLtoFile';
import { setImgCompress } from '../../../utils/setImgCompress';
import ImageForm from '../../common/ImageForm';

type ToggleProps = {
  firstToggle: boolean;
  secondToggle: boolean;
};

interface ImageInputProps {
  handleCropImageToggle: React.MouseEventHandler;
  handleToggleModify: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isToggle: ToggleProps;
}

const ImageInput = (props: ImageInputProps) => {
  const { handleCropImageToggle, handleToggleModify, isToggle } = props;

  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const [isComplete, setIsComplete] = useState(false);
  const { title, firstImageUrl, secondImageUrl } = votingForm;
  const { firstToggle, secondToggle } = isToggle;
  const navigate = useNavigate();
  let submitFlag = false;

  useEffect(() => {
    if (!title) {
      setIsComplete(false);
    }
    handleCheckImageObj();
  }, [title, votingForm]);

  const handleSubmitCheck = () => {
    if (submitFlag) {
      return submitFlag;
    }
    submitFlag = true;
    return false;
  };

  const handleReadFileUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileBlob = e.target.files[0];
      const compressedImg = await setImgCompress(fileBlob);
      const reader = new FileReader();
      if (compressedImg) {
        reader.readAsDataURL(compressedImg);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          if (e.target.name === 'firstImg') {
            setVotingForm({ ...votingForm, firstImageUrl: base64data });
          } else {
            setVotingForm({ ...votingForm, secondImageUrl: base64data });
          }
        };
      }
    }
  };

  const handleRemoveImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      if (target.value === 'firstRemove') {
        setVotingForm({ ...votingForm, firstImageUrl: '' });
        window.location.reload();
      } else {
        setVotingForm({ ...votingForm, secondImageUrl: '' });
        window.location.reload();
      }
    }
  };

  const handleCheckImageObj = () => {
    if (title && firstImageUrl && secondImageUrl) {
      setIsComplete(true);
    }
  };

  const handlePostImage = async () => {
    if (handleSubmitCheck()) {
      return;
    }
    const imageData = new FormData();
    const firstImgToFile = setDataURLtoFile(firstImageUrl, 'firstImg');
    const secondImgToFile = setDataURLtoFile(secondImageUrl, 'secondImg');
    if (firstImgToFile && secondImgToFile) {
      imageData.append('file', firstImgToFile);
      imageData.append('file', secondImgToFile);
      imageData.append('title', title);
    }
    const response = await postImage(imageData);
    if (response.status === 200) {
      navigate('/share', { state: response.data });
      setVotingForm({
        title: '',
        firstImageUrl: '',
        secondImageUrl: '',
      });
    }
  };

  return (
    <>
      <StImageInputWrapper>
        <ImageForm
          imageUrl={firstImageUrl}
          alt="첫번째 이미지"
          toggle={firstToggle}
          handleToggle={handleToggleModify}
          handleRemove={handleRemoveImg}
          handleCrop={handleCropImageToggle}
          handleReadFileUrl={handleReadFileUrl}
          name="firstImg"
        />
        <ImageForm
          imageUrl={secondImageUrl}
          alt="두번째 이미지"
          toggle={secondToggle}
          handleToggle={handleToggleModify}
          handleRemove={handleRemoveImg}
          handleCrop={handleCropImageToggle}
          handleReadFileUrl={handleReadFileUrl}
          name="secondImg"
        />
        <StImageSubmitButton type="submit" isComplete={isComplete} disabled={!isComplete} onClick={handlePostImage}>
          투표 만들기 완료
        </StImageSubmitButton>
      </StImageInputWrapper>
    </>
  );
};

export default ImageInput;

const StImageInputWrapper = styled.section`
  position: relative;

  width: 100%;
  margin-top: 4.1rem;
`;
const StImageSubmitButton = styled.button<{ isComplete: boolean }>`
  width: 100%;
  height: 5.8rem;
  margin-top: 3rem;
  margin-bottom: 13.3rem;

  border: none;
  border-radius: 0.9rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16}

  cursor: pointer;

  ${({ isComplete }) =>
    isComplete
      ? css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
        `}
`;
