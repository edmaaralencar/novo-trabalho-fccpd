import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useUser() {
  const [userId, setUserId] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userIdStorage = localStorage.getItem('userId')

    if (userIdStorage) {
      setUserId(JSON.parse(userIdStorage) as number)
    }
  }, [])

  function logout() {
    setUserId(null)
    localStorage.removeItem('userId')
    navigate('/')
  }

  return {
    userId,
    logout,
  }
}
