function getBackendUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_GQL_BACKEND_URL === 'string') {
    return process.env.NEXT_PUBLIC_GQL_BACKEND_URL
  }
  throw new Error('NEXT_PUBLIC_GQL_BACKEND_URL is not set')
}

export default getBackendUrl
