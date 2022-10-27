import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
