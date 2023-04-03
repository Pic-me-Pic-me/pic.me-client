import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface TitleInputProps {
  title: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TitleInput = (props: TitleInputProps) => {
  const { votingType } = useParams() as { votingType: string };
  const { title, handleChangeInput } = props;

  return (
    <StTitleInputWrapper>
      {votingType === 'normal' ? (
        <StTitleInput
          value={title}
          onChange={handleChangeInput}
          placeholder="투표에 어울리는 제목을 입력해주세요!"
          maxLength={22}
        />
      ) : (
        <>
          <StFlowerTitle>나를 닮은 꽃은?</StFlowerTitle>
          <StFlowerSubTitle>나의 분위기를 잘 담고 있는 사진을 올려주세요!</StFlowerSubTitle>
        </>
      )}
    </StTitleInputWrapper>
  );
};
export default TitleInput;

const StTitleInputWrapper = styled.div`
  text-align: center;
`;
const StTitleInput = styled.textarea`
  width: 32.7rem;

  border: none;
  outline: none;

  text-align: center;
  resize: none;

  ${({ theme }) => theme.fonts.Pic_Noto_SB_Title_2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;

const StFlowerTitle = styled.p`
  margin-bottom: 0.685rem;

  color: ${({ theme }) => theme.colors.Pic_Color_Gray_Black};
  ${({ theme }) => theme.fonts.Pic_Noto_B_Title_1};
`;
const StFlowerSubTitle = styled.span`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Noto_M_Subtitle_5};
`;
