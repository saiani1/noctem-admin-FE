import { atom } from 'recoil';
import { IList } from '../../types/order.d';

export const requestState = atom<IList[]>({
  key: 'requestState',
  default: [],
});

export const confirmState = atom<IList[]>({
  key: 'confirmState',
  default: [],
});

export const completionState = atom<IList[]>({
  key: 'completionState',
  default: [],
});
