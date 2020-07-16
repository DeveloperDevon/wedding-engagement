import React, { useState, useEffect, createContext } from 'react'
import { auth } from '../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocalStorage } from '@rehooks/local-storage';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [_, loading, error] = useAuthState(auth())
  const [authContext, setAuthContext] = useState(null)
  const [secretCode] = useLocalStorage('secretCode');

  useEffect(() => {
    setAuthContext({ auth: secretCode === process.env.REACT_APP_SECRET_CODE, loading, error })
  }, [secretCode, loading, error])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}