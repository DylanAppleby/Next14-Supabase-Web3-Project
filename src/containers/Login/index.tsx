import Link from 'next/link'

import { KeyboardEvent, memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from 'components/Button'
import FormLine from 'components/FormLine'
import { ArrowBack, Google, Twitter } from 'components/Icons'
import { useQueryParams } from 'hooks/useQueryParam'
import { supabase } from 'services/supabase'
import { LoginSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isTwitterLoading, setIsTwitterLoading] = useState<boolean>(false)

  const queryParams = useQueryParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const handleSignIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true)
      const { error } = await supabase.auth
        .signInWithPassword({
          email,
          password,
        })
        .finally(() => setIsLoading(false))

      if (error) toast.error(error.message)
    },
    []
  )

  const handleProviderSignIn = useCallback(
    async (provider: 'google' | 'twitter') => {
      if (provider === 'google') setIsGoogleLoading(true)
      else setIsTwitterLoading(true)

      const { error } = await supabase.auth
        .signInWithOAuth({
          provider,
          options: {
            redirectTo: process.env.NEXT_PUBLIC_SITE_URI,
          },
        })
        .finally(() => {
          if (provider === 'google') setIsGoogleLoading(true)
          else setIsTwitterLoading(true)
        })

      if (error) toast.error(error.message)
    },
    []
  )

  const handleEnterDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(handleSignIn)
      }
    },
    [handleSignIn, handleSubmit]
  )

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className=" flex flex-col gap-7 rounded-5 bg-white p-5"
    >
      <div className="flex justify-between text-xl font-medium leading-6 text-black/90">
        Sign in
        <Link
          href={queryParams.set('auth', 'register')}
          className="flex items-center gap-1 rounded-xl bg-black/10 p-2 text-sm font-bold text-black/90"
        >
          Register
          <ArrowBack className="rotate-180" />
        </Link>
      </div>
      <FormLine
        title="Email"
        id="email"
        type="text"
        error={errors.email?.message}
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
      <Button
        className="!rounded-2xl bg-darkGreen text-white"
        type="submit"
        isLoading={isLoading}
        disabled={isLoading || isGoogleLoading || isTwitterLoading}
      >
        Login
      </Button>
      <div className="flex justify-between">
        <Button
          onClick={() => handleProviderSignIn('google')}
          className="w-40 items-center gap-2 !rounded-2xl border !py-4 !text-xl text-black"
          isLoading={isGoogleLoading}
          disabled={isLoading || isGoogleLoading || isTwitterLoading}
        >
          <Google /> Google
        </Button>
        <Button
          onClick={() => handleProviderSignIn('twitter')}
          className="w-40 items-center gap-2 !rounded-2xl border !py-4 !text-xl text-black"
          isLoading={isTwitterLoading}
          disabled={isLoading || isGoogleLoading || isTwitterLoading}
        >
          <Twitter /> Twitter
        </Button>
      </div>
    </form>
  )
}
export default memo(Login)
