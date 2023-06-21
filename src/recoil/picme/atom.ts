import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const notificationPermission = atom<string>({
  key: 'notificationPermission',
  default: 'init',
  effects_UNSTABLE: [persistAtom],
});
