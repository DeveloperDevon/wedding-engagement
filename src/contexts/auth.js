import { useLocalStorage } from '@rehooks/local-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [_, loading, error] = useAuthState(auth())
  const [authContext, setAuthContext] = useState(null)
  const [guestName] = useLocalStorage('guestName');

  useEffect(() => {
    console.log(guestName)
    setAuthContext({
      auth: !!guestName && guestName !== process.env.REACT_APP_ADMIN_TOKEN,
      admin: guestName === process.env.REACT_APP_ADMIN_TOKEN,
      loading,
      error
    })
  }, [guestName, loading, error])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}