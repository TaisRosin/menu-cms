import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL?.trim()

function isValidApiUrl(value: string | undefined): boolean {
  if (!value) return false

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const apiConfigurationError = isValidApiUrl(apiUrl)
  ? null
  : 'Defina VITE_API_URL no arquivo .env com uma URL HTTP ou HTTPS válida e reinicie o servidor de desenvolvimento.'

export const api = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (apiConfigurationError) {
    return Promise.reject(new Error(apiConfigurationError))
  }
  return config
})
