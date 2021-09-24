export default (): void => {
  process.env.OPENID_CLIENT_ID = ''
  process.env.OPENID_CLIENT_SECRET = ''
  process.env.OPENID_ISSUER = ''
  process.env.JWT_AUTHORITY_ISSUER = 'jestUnitTest'
  process.env.JWT_AUTHORITY_ISSUER_SHARED_SECRET = 'jestUnitTestSecret'
  process.env.SESSION_SECRET = ''
  process.env.NEXT_PUBLIC_GQL_BACKEND_URL = ''
}
