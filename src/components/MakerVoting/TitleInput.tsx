import { useState } from 'react';
import styled from 'styled-components';

const TitleInput = () => {
  const [input, setInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <StTitleInputWrapper>
      <StTitleInput
        type="text"
        value={input}
        onChange={handleChangeInput}
        placeholder="투표에 어울리는 제목을 입력해주세요!"
      />
      <StTitleInputMaxBlock>
        <StTitleInputMax>(최대 22자)</StTitleInputMax>
      </StTitleInputMaxBlock>
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
const StTitleInputMaxBlock = styled.div`
  width: 29.7rem;
  margin: 0.8rem auto;

  text-align: right;
`;
const StTitleInputMax = styled.span`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_3};
  ${({ theme }) => theme.fonts.Pic_Caption1_Pretendard_Semibold_12};
`;
