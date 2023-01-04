import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { votingTitleState } from '../../recoil/maker/atom';
import ImageInput from './ImageInput';
import TitleInput from './TitleInput';

const MakerVotingLayout = () => {
  const [input, setInput] = useRecoilState(votingTitleState);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <StMakerVotingLayoutWrapper>
      <TitleInput input={input} handleChangeInput={handleChangeInput} />
      <ImageInput input={input} />
    </StMakerVotingLayoutWrapper>
  );
};

export default MakerVotingLayout;

const StMakerVotingLayoutWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
`;
