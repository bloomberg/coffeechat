export interface UserInfo {
  id: string
  email: string
  family_name: string
  given_name: string
  system_roles: string[]
}

export interface SessionData {
  jwt: string
  user: UserInfo
}
