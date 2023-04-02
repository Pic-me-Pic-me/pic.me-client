import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { VOTING_FLOWER, VOTING_NORMAL } from '../../../constant/voting';
import { postImageFlower, postImageNormal } from '../../../lib/api/voting';
import { votingImageState } from '../../../recoil/maker/atom';
import { setDataURLtoFile } from '../../../utils/setDataURLtoFile';
import ImageForm from '../../common/ImageForm';

interface ImageInputProps {
  handleCropImageToggle: (idx: number) => void;
  copyImageForm: string[];
}

const ImageInput = (props: ImageInputProps) => {
  const { handleCropImageToggle, copyImageForm } = props;
  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { votingType } = useParams() as { votingType: string };
  const { title, imageUrl } = votingForm;
  let submitFlag = false;

  useEffect(() => {
    if (votingType === 'normal') {
      for (let i = 0; i < VOTING_NORMAL; i++) {
        copyImageForm[i] = '';
      }
      setVotingForm({ ...votingForm, imageUrl: copyImageForm });
    } else {
      if (imageUrl.length === 2) {
        copyImageForm.pop();
      } else {
        for (let i = 0; i < VOTING_FLOWER; i++) {
          copyImageForm[i] = '';
        }
      }
      setVotingForm({ ...votingForm, imageUrl: copyImageForm });
    }
  }, []);

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

  const handleCheckImageObj = () => {
    if (votingType === 'normal') {
      if (title && !imageUrl.includes('')) {
        setIsComplete(true);
      }
    } else {
      if (!imageUrl.includes('')) {
        setIsComplete(true);
      }
    }
  };

  const handlePostImage = async () => {
    if (handleSubmitCheck()) {
      return;
    }
    const imageData = new FormData();
    if (votingType === 'normal') {
      const firstImgToFile = setDataURLtoFile(imageUrl[0], 'firstImg');
      const secondImgToFile = setDataURLtoFile(imageUrl[1], 'secondImg');
      if (firstImgToFile && secondImgToFile) {
        imageData.append('file', firstImgToFile);
        imageData.append('file', secondImgToFile);
        imageData.append('title', title);
        const response = await postImageNormal(imageData);
        if (response.status === 200) {
          navigate('/share', { state: { voteId: response.data, isFlowerVote: false } });
          setVotingForm({
            title: '',
            imageUrl: [],
          });
        }
      }
    } else {
      const firstImgToFile = setDataURLtoFile(imageUrl[0], 'firstImg');
      if (firstImgToFile) {
        imageData.append('file', firstImgToFile);
        const response = await postImageFlower(imageData);
        if (response.status === 200) {
          navigate('/share', { state: { voteId: response.data, isFlowerVote: true } });
          setVotingForm({
            title: '',
            imageUrl: [],
          });
        }
      }
    }
  };

  return (
    <>
      <StImageInputWrapper>
        {imageUrl.map((_, idx: number) => (
          <ImageForm
            key={idx}
            idx={idx}
            alt="이미지"
            handleCrop={handleCropImageToggle}
            copyImageForm={copyImageForm}
          />
        ))}
        <StImageSubmitButton type="submit" isComplete={isComplete} disabled={!isComplete} onClick={handlePostImage}>
          선택완료
        </StImageSubmitButton>
      </StImageInputWrapper>
    </>
  );
};

export default ImageInput;

const StImageInputWrapper = styled.section`
  position: relative;

  width: 100%;
  margin-top: 0.726rem;
`;
const StImageSubmitButton = styled.button<{ isComplete: boolean }>`
  width: 100%;
  height: 5.2rem;
  margin-top: 2.574rem;
  margin-bottom: 13.3rem;

  border: none;
  border-radius: 0.754rem;

  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5}

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
