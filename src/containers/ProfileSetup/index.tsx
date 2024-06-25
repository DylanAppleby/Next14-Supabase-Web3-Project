import { KeyboardEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, FormLine, TextArea } from 'components'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { Paths, Tables } from 'utils/constants'
import { SetupProfileSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

type ISetupOptions = {
  userName: string
  firstName: string
  lastName: string
  bio?: string
}

const ProfileSetup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false)

  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SetupProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      userName: user.user_name || '',
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      bio: user.bio || '',
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

  const handleRegister = useCallback(
    async ({ userName, firstName, lastName, bio }: ISetupOptions) => {
      setIsLoading(true)
      const isUserName =
        user.user_name === userName ? false : await handleUserNameAvailable()

      if (isUserName || !user.email) {
        setIsLoading(false)
        return
      }

      const options: {
        user_name?: string
        first_name: string
        last_name: string
        bio?: string
      } = {
        user_name: userName,
        first_name: firstName,
        last_name: lastName,
        bio,
      }

      const { error } = await supabase
        .from(Tables.USERS)
        .update(options)
        .eq('email', user.email)

      setIsLoading(false)

      if (error) {
        toast.error(error.message)
        return
      }

      window.location.replace(Paths.HOME)
    },

    [handleUserNameAvailable, user.email, user.user_name]
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
        Setup Profile
      </div>
      <div className="flex justify-between">
        <FormLine
          title="First Name"
          id="first_name"
          type="text"
          error={errors.firstName?.message}
          {...register('firstName')}
          placeholder="Enter a user name"
          onKeyDown={handleEnterDown}
          isLoading={isLoading}
          required
        />
        <FormLine
          title="Last Name"
          id="last_name"
          type="text"
          error={errors.lastName?.message}
          {...register('lastName')}
          placeholder="Enter a user name"
          onKeyDown={handleEnterDown}
          isLoading={isLoading}
          required
        />
      </div>
      <FormLine
        title="User Name"
        id="username"
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
        Save
      </Button>
    </form>
  )
}
export default ProfileSetup
