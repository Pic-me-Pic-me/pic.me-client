import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcError } from '../../asset/icon';

const Error = () => {
  const navigate = useNavigate();
  return (
    <StErrorWrapper>
      <IcError />
      <StWarningBlock>
        <StWarningText>해당 페이지를 찾을 수 없어요.</StWarningText>
        <StWarningText>올바른 URL을 입력했는지 확인해주세요!</StWarningText>
      </StWarningBlock>
      <StBackHomeBtn type="button" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </StBackHomeBtn>
    </StErrorWrapper>
  );
};

export default Error;

const StErrorWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 0 2rem;
`;
const StWarningBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3.429rem;
`;
const StWarningText = styled.span`
  color: ${({ theme }) => theme.colors.Pic_Color_Gray_4};
  ${({ theme }) => theme.fonts.Pic_Subtitle2_Pretendard_Medium_18};
`;
const StBackHomeBtn = styled.button`
  width: 100%;
  height: 6rem;
  margin-top: 18.1rem;

  border: none;
  border-radius: 0.9rem;
  background-color: ${({ theme }) => theme.colors.Pic_Color_Coral};
  color: ${({ theme }) => theme.colors.Pic_Color_White};
  ${({ theme }) => theme.fonts.Pic_Body1_Pretendard_Medium_16};

  cursor: pointer;
`;
