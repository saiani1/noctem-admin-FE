import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const categoryState = atom({
  key: 'categoryState',
  default: 'store',
  effects_UNSTABLE: [persistAtom],
});
