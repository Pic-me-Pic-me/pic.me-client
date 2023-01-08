import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//페이지가 변경되더라도 상태관리를 유지
const { persistAtom } = recoilPersist();

export const firstVerticalScrollInfo = atom({
  key: 'FirstVerticalScroll',
  default: {
    flag: 0,
    date: new Date(0),
  },
  effects_UNSTABLE: [persistAtom],
});
