import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'


import { api } from '../services/api'

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APPOINTMENTS_COLLECTION, USERS_COLLECTION } from '../configs/localStorage'

const { SCOPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env
const { REDIRECT_URI } = process.env
const { RESPONSE_TYPE } = process.env

type User = {
  id: string,
  username: string,
  firstName: string,
  avatar: string,
  email: string,
  token: string
}

type AuthContextData = {
  user: User,
  loading: boolean,
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string,
    error?: string
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  async function signIn() {
    try {
      setLoading(true)

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === "success" && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`

        const userInfo = await api.get('/users/@me')

        const firstName = userInfo.data.username.split(' ')[0]

        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

        const userData: User = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(USERS_COLLECTION, JSON.stringify(userData))

        setUser(userData)

      }
    } catch {
      throw new Error('N??o foi poss??vel autenticar');
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    setUser({} as User)

    await AsyncStorage.removeItem(USERS_COLLECTION)
    await AsyncStorage.removeItem(APPOINTMENTS_COLLECTION)
  }

  async function loadUserLocalData() {
    const storage = await AsyncStorage.getItem(USERS_COLLECTION);

    if (storage) {
      const loggedUser = JSON.parse(storage) as User
      api.defaults.headers.authorization = `Bearer ${loggedUser.token}`

      setUser(loggedUser);
    }
  }

  useEffect(() => {
    loadUserLocalData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, loading, signOut }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context
}

export {
  AuthProvider,
  useAuth,
}