import styled from 'styled-components';

interface TitleInputProps {
  input: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput = (props: TitleInputProps) => {
  const { input, handleChangeInput } = props;

  return (
    <StTitleInputWrapper>
      <StTitleInput
        type="text"
        value={input}
        onChange={handleChangeInput}
        placeholder="투표에 어울리는 제목을 입력해주세요!"
      />
    </StTitleInputWrapper>
  );
};
export default TitleInput;

const StTitleInputWrapper = styled.header`
  text-align: center;
`;
const StTitleInput = styled.input`
  width: 32.7rem;
  height: 2.6rem;

  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.Pic_Title3_Pretendard_SemiBold_22}

  &::placeholder {
    color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  }
`;
