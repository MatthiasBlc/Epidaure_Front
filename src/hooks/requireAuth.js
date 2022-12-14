import { useAtom } from 'jotai';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { loggedAtom } from '../services/Atoms/user';

const RequireAuth = ({ children }) => {
  const [logged,] = useAtom(loggedAtom);
  return logged !== undefined ? children : <Navigate to="/login" replace={true} />
}

export default RequireAuth;