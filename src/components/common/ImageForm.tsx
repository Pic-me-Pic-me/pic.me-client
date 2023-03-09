import styled from 'styled-components';

import { IcCropImg, IcImageAdd, IcModify, IcRemoveImg } from '../../asset/icon';

interface ImageFormProps {
  imageUrl: string;
  alt: string;
  toggle: boolean;
  name: string;
  handleToggle: React.MouseEventHandler;
  handleRemove: React.MouseEventHandler;
  handleCrop: React.MouseEventHandler;
  handleReadFileUrl: React.ChangeEventHandler;
}
const ImageForm = (props: ImageFormProps) => {
  const { imageUrl, alt, toggle, handleToggle, handleRemove, handleCrop, handleReadFileUrl, name } = props;

  return imageUrl ? (
    <StImageTextBlock>
      <StImage src={imageUrl} alt={alt} />
      {toggle ? (
        <StModifyImageButton type="button" value="modify" onClick={handleToggle}>
          <IcModify />
        </StModifyImageButton>
      ) : (
        <StModifyBlock>
          <StModifyDepthBtn type="button" value="remove" onClick={handleRemove}>
            <IcRemoveImg />
          </StModifyDepthBtn>
          <StModifyDepthBtn type="button" value="crop" onClick={handleCrop}>
            <IcCropImg />
          </StModifyDepthBtn>
        </StModifyBlock>
      )}
    </StImageTextBlock>
  ) : (
    <StImageInputLabel>
      <StImageInput type="file" name={name} accept="image/*" onChange={handleReadFileUrl} />
      <StImageTextBlock>
        <IcImageAdd />
        <StImageText>여기에 사진을 넣어주세요!</StImageText>
      </StImageTextBlock>
    </StImageInputLabel>
  );
};

export default ImageForm;
const StImageInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 52rem;
  margin-bottom: 2rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Gray_5};

  cursor: pointer;
`;
const StImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 1.2rem;

  object-fit: cover;
`;
const StImageInput = styled.input`
  display: none;
`;
const StImageTextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 52rem;
  margin-bottom: 2rem;

  overflow: hidden;
`;
const StImageText = styled.span`
  margin-top: 2.827rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};
`;
const StModifyImageButton = styled.button`
  position: absolute;
  right: 2.1rem;
  bottom: 2.1rem;

  width: 6rem;
  height: 6rem;

  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  cursor: pointer;
  svg {
    pointer-events: none;
  }
`;
const StModifyBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 2.1rem;
  bottom: 2.1rem;

  width: 6rem;
  height: 12rem;

  border-radius: 6rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  z-index: 5;
`;
const StModifyDepthBtn = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};

  outline: none;
  cursor: pointer;
  svg {
    pointer-events: none;
  }
`;
