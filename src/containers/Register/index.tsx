import { KeyboardEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, FormLine, TextArea } from 'components'
import { supabase } from 'services/supabase'
import { Paths } from 'utils/constants'
import { RegisterSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      confirm: '',
      bio: '',
    },
  })

  const handleUserNameAvailable = useCallback(async () => {
    const { data: isInUse, error } = await supabase.rpc('does_username_exist', {
      p_username: watch('userName'),
    })

    if (error) {
      toast.error(error.message)
      return false
    }

    setIsUserNameAvailable(isInUse)

    return isInUse
  }, [watch])

  const handleEmailAvailable = useCallback(async () => {
    const { data: isInUse, error } = await supabase.rpc(
      'auth_does_email_exist',
      {
        email_address: watch('email'),
      }
    )

    if (error) {
      toast.error(error.message)
      return false
    }

    setIsEmailAvailable(isInUse)

    return isInUse
  }, [watch])

  const handleRegister = useCallback(
    async ({
      email,
      password,
      userName,
    }: {
      email: string
      password: string
      userName: string
    }) => {
      setIsLoading(true)
      const isUserName = await handleUserNameAvailable()
      const isEmail = await handleEmailAvailable()

      if (isEmail || isUserName) {
        setIsLoading(false)
        return
      }

      const { error } = await supabase.auth
        .signUp({
          email,
          password,
          options: {
            data: {
              username: userName,
            },
          },
        })
        .finally(() => setIsLoading(false))

      if (error) {
        toast.error(error.message)
        return
      }

      window.location.replace(Paths.HOME)
    },

    [handleEmailAvailable, handleUserNameAvailable]
  )

  const handleEnterDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(handleRegister)
      }
    },
    [handleRegister, handleSubmit]
  )

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex min-w-120 flex-col gap-7 rounded-5 bg-white p-3"
    >
      <div className="flex justify-between text-xl font-medium leading-6 text-black/90">
        Sign up
      </div>
      <FormLine
        title="User Name"
        id="name"
        type="text"
        error={
          isUserNameAvailable
            ? 'Username already exists'
            : errors.userName?.message
        }
        {...register('userName')}
        placeholder="Enter a user name"
        onKeyDown={handleEnterDown}
        isLoading={isLoading}
        required
      />

      <FormLine
        title="Email"
        id="email"
        type="email"
        error={
          isEmailAvailable ? 'Email already exists' : errors.email?.message
        }
        {...register('email')}
        placeholder="Your email address"
        onKeyDown={handleEnterDown}
        isLoading={isLoading}
        required
      />
      <FormLine
        title="Password"
        id="password"
        type="password"
        error={errors.password?.message}
        placeholder="Enter your password"
        {...register('password')}
        onKeyDown={handleEnterDown}
        required
      />
      <FormLine
        title="Confirm"
        id="confirm"
        type="password"
        error={errors.confirm?.message}
        {...register('confirm')}
        placeholder="Confirm your password"
        onKeyDown={handleEnterDown}
        required
      />
      <div className="relative">
        <TextArea
          title="Bio"
          required
          id="bio"
          rows={4}
          maxLength={100}
          placeholder="Who are you?"
          error={errors.bio?.message}
          {...register('bio')}
        />
        <p className="absolute bottom-5 right-4 text-base font-medium leading-[100%] text-black/90 opacity-40">
          {`${watch('bio')?.length} / 100`}
        </p>
      </div>
      <Button
        className="!rounded-2xl bg-darkGreen text-white"
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Register
      </Button>
    </form>
  )
}
export default Register
