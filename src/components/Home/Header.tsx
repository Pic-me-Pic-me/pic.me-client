import { IcGoback, IcShare } from '../../asset/icon';
import { HeaderLayout } from '../Layout';

const Header = () => (
  <>
    <HeaderLayout HeaderTitle="현재 진행중인 투표" ShareIcon={<IcShare />} Logo={<IcGoback />} isShare={true} />
  </>
);

export default Header;
