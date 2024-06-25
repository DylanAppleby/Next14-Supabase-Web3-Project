import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useEffect } from 'react'

import Modal from 'containers/Modal'
import ProfileSetup from 'containers/ProfileSetup'
import Register from 'containers/Register'
import { useAuth } from 'contexts/AuthContext'

const Auth = () => {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const auth = searchParams.get('auth') as string | undefined

  const handleBlur = useCallback(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('auth')
    router.push(`${pathname}?${newParams.toString()}`)
  }, [pathname, router, searchParams])

  const checkProfileComplete = useCallback(() => {
    if (!user.id) return
    if (!user.user_name) {
      router.push(`${pathname}?auth=setup`)
      return
    }
    if (!user.last_name) {
      router.push(`${pathname}?auth=setup`)
      return
    }
    if (!user.first_name) {
      router.push(`${pathname}?auth=setup`)
    }
  }, [
    pathname,
    router,
    user.first_name,
    user.id,
    user.last_name,
    user.user_name,
  ])

  useEffect(() => {
    checkProfileComplete()
  }, [checkProfileComplete])

  return (
    <Modal
      showModal={user.id ? auth === 'setup' : auth === 'register'}
      onClose={user.id ? undefined : handleBlur}
    >
      {auth === 'register' ? <Register /> : <ProfileSetup />}
    </Modal>
  )
}

export default Auth
