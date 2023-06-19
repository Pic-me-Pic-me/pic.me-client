import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const notificationPermission = atom<boolean>({
  key: 'notificationPermission',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
