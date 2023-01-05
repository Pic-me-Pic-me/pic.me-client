import styled from 'styled-components';

interface TitleInputProps {
  title: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TitleInput = (props: TitleInputProps) => {
  const { title, handleChangeInput } = props;

  return (
    <StTitleInputWrapper>
      <StTitleInput
        value={title}
        onChange={handleChangeInput}
        placeholder="투표에 어울리는 제목을 입력해주세요!"
        maxLength={22}
      />
    </StTitleInputWrapper>
  );
};
export default TitleInput;

const StTitleInputWrapper = styled.div`
  text-align: center;
`;
const StTitleInput = styled.textarea`
  width: 32.7rem;
  height: 5.6rem;

  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_SemiBold_22}

  &::placeholder {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;
