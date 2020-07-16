import React, { useState, useEffect, createContext } from 'react'
import { auth } from '../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [currentUser, isLoading, hasError] = useAuthState(auth())
  const [authContext, setAuthContext] = useState(null)

  useEffect(() => {
    setAuthContext({ user: currentUser, loading: isLoading, error: hasError })
  }, [currentUser, isLoading, hasError])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}