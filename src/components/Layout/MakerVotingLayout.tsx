import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { votingImageState } from '../../recoil/maker/atom';
import ImageInput from '../MakerVoting/ImageInput';
import TitleInput from '../MakerVoting/TitleInput';

const MakerVotingLayout = () => {
  const [votingForm, setVotingForm] = useRecoilState(votingImageState);
  const { title } = votingForm;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVotingForm({ ...votingForm, title: e.target.value });
  };

  return (
    <StMakerVotingLayoutWrapper>
      <TitleInput input={title} handleChangeInput={handleChangeInput} />
      <ImageInput input={title} />
    </StMakerVotingLayoutWrapper>
  );
};

export default MakerVotingLayout;

const StMakerVotingLayoutWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
`;
