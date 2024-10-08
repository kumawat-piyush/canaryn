import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signin')

    return () => {
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.removeItem('token')
      }
    }
  }, [])
  return null
}
