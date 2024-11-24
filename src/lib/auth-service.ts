import EntityStorage from '@/lib/entity-storage'
import { Session } from '@/queries/login'

const SESSION_KEY_NAME = 'session'

export const setSession = (session: Session) =>
  EntityStorage.set<Session>(SESSION_KEY_NAME, session)

export const isLogged = () => {
  const data = EntityStorage.get<Session>(SESSION_KEY_NAME)
  return data ? true : false
}

export const getToken = () => {
  const data = EntityStorage.get<Session>(SESSION_KEY_NAME)
  return data ? data.token : undefined
}

export const isAdmin = () => {
  const data = EntityStorage.get<Session>(SESSION_KEY_NAME)
  const roles = data?.decoded.roles ?? []
  return roles.includes('ROLE_ADMIN')
}

export const isPremium = () => {
  const data = EntityStorage.get<Session>(SESSION_KEY_NAME)
  const roles = data?.decoded.roles ?? []
  return roles.includes('PREMIUM')
}

export const getUsername = () => {
  const data = EntityStorage.get<Session>(SESSION_KEY_NAME)
  return data?.decoded.username
}

export const getUserAvatar = () => 'https://github.com/shadcn.png'

export const logout = () => {
  EntityStorage.remove(SESSION_KEY_NAME)
}

export const useLogout = () => ({ logout })
