import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { LoginForm } from './pages/Login'
import '@harnessio/canary/styles'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main>
        <LoginForm />
      </main>
    </ThemeProvider>
  )
}
