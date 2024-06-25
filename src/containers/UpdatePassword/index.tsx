import { useRouter } from 'next/navigation'

import { KeyboardEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, FormLine } from 'components'
import { supabase } from 'services/supabase'
import { Paths } from 'utils/constants'
import { UpdatePasswordSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdatePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirm: '',
    },
  })

  const handleUpdatePassword = useCallback(
    async ({ password }: { password: string }) => {
      setIsLoading(true)

      const { error } = await supabase.auth.updateUser({
        password,
      })

      setIsLoading(false)

      if (error) {
        toast.error(error.message)
        return
      }

      router.push(Paths.PEOPLE_ME)
    },

    [router]
  )

  const handleEnterDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(handleUpdatePassword)
      }
    },
    [handleUpdatePassword, handleSubmit]
  )

  return (
    <form className="flex w-full flex-col gap-5 rounded-5 bg-white p-4">
      <h1 className="mb-1 flex items-center justify-between text-lg font-semibold text-black/90">
        Change Password
        <Button
          type="submit"
          isLoading={isLoading}
          className="h-9 w-16 bg-orange text-white"
        >
          Save
        </Button>
      </h1>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold text-black/40">New Password</h2>
        <FormLine
          onKeyDown={handleEnterDown}
          {...register('password')}
          error={errors.password?.message}
          id="password"
          className="w-53"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold text-black/40">Confirmation</h2>
        <FormLine
          onKeyDown={handleEnterDown}
          {...register('confirm')}
          error={errors.confirm?.message}
          id="confirm"
          className="w-53"
        />
      </div>
    </form>
  )
}

export default UpdatePassword
