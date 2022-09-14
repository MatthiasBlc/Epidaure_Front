import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const loggedAtom = atom(Cookies.get('token'));