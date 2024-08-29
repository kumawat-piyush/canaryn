import { mapKeys } from 'lodash-es'

export const generateHeaders = (headers: RequestInit['headers'] = {}): RequestInit['headers'] => {
  const retHeaders: RequestInit['headers'] = {
    'content-type': 'application/json'
  }

  const token = localStorage.getItem('token')

  if (token && token.length > 0) {
    const parsedToken = JSON.parse(decodeURIComponent(atob(token)))
    retHeaders.Authorization = `Bearer ${parsedToken}`
  }

  Object.assign(
    retHeaders,
    mapKeys(headers, (_value, key) => key.toLowerCase())
  )

  return retHeaders
}
