import { useNavigate } from 'react-router-dom';

import { HeaderLayout } from '../Layout';

const Header = () => {
  const navigate = useNavigate();
  const handlePrevpage = () => {
    navigate('/');
  };
  return (
    <>
      <HeaderLayout HeaderTitle="현재 진행 중인 투표" handleGoback={handlePrevpage} />
    </>
  );
};

export default Header;
