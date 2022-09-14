import { atomWithStorage } from 'jotai/utils';

export const currentUserAtom = atomWithStorage('userData', null);