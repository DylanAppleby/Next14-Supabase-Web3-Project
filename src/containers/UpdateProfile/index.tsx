import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Button,
  FormLine,
  Instagram,
  Linkedin,
  Mail,
  TextArea,
  Twitter,
} from 'components'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { Paths, Tables } from 'utils/constants'
import { uploadImage } from 'utils/uploadFile'
import { UserInfoSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

import Avatar from './Avatar'

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const { user, setUser } = useAuth()
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true)

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.defaultValue !== e.target.value) setIsEditDisabled(false)
  }

  useEffect(() => {
    if (avatar) setIsEditDisabled(false)
  }, [avatar])

  const props = useMemo(
    () => ({
      bio: user.bio,
      user_name: user.user_name,
      avatar_url: user.avatar_url || '',
    }),
    [user.avatar_url, user.bio, user.user_name]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      userName: user.user_name || '',
      bio: user.bio || '',
    },
  })

  const handleUpdateUserInfo = useCallback(
    async ({ userName, bio }: { userName: string; bio: string }) => {
      setIsLoading(true)

      if (userName !== user.user_name) props.user_name = userName
      if (bio !== user.bio) props.bio = bio

      let deleteImage: () => Promise<void> = async () => {}
      if (avatar) {
        const { url, onDelete } = await uploadImage(avatar, 'avatars', user.id)
        props.avatar_url = url
        deleteImage = onDelete
      }

      const { error } = await supabase
        .from(Tables.USERS)
        .update(props)
        .eq('id', user.id)

      setUser({
        ...user,
        ...props,
      })

      if (error) {
        toast.error(error.message)
        await deleteImage()
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      window.location.replace(Paths.PEOPLE_ME)
    },

    [avatar, props, setUser, user]
  )

  const handleEnterDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(handleUpdateUserInfo)
      }
    },
    [handleUpdateUserInfo, handleSubmit]
  )

  return (
    <form
      onSubmit={handleSubmit(handleUpdateUserInfo)}
      className="relative flex w-full flex-col items-center gap-4 rounded-5 bg-white px-6 pb-6 pt-8"
    >
      <Button
        type="submit"
        disabled={isEditDisabled}
        isLoading={isLoading}
        className="absolute right-4 top-4 h-9 w-16 bg-orange text-white"
      >
        Save
      </Button>
      <Avatar setAvatar={setAvatar} avatarUrl={props.avatar_url} />
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <h2 className="text-lg font-semibold text-black/40">User Name</h2>
        <FormLine
          onKeyDown={handleEnterDown}
          {...register('userName')}
          error={errors.userName?.message}
          onChange={handleChangeValue}
          id="username"
          placeholder="@username"
          className="w-72"
        />
      </div>
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <h2 className="text-lg font-semibold text-black/40">Bio</h2>
        <TextArea
          {...register('bio')}
          error={errors.bio?.message}
          onChange={handleChangeValue}
          id="username"
          placeholder="I am not a tofu"
          className="!w-72"
        />
      </div>
      <h2 className="w-[407px]  text-lg font-semibold text-black/40">
        Socials
      </h2>
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <Mail />
        <FormLine
          onKeyDown={handleEnterDown}
          id="username"
          placeholder="abc@gmail.com"
          className="w-72"
        />
      </div>
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <Twitter />
        <FormLine
          onKeyDown={handleEnterDown}
          id="username"
          placeholder="@username"
          className="w-72"
        />
      </div>
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <Instagram />
        <FormLine
          onKeyDown={handleEnterDown}
          id="username"
          placeholder="@username"
          className="w-72"
        />
      </div>
      <div className="flex w-full max-w-[407px] items-center justify-between">
        <Linkedin />
        <FormLine
          onKeyDown={handleEnterDown}
          id="username"
          placeholder="@"
          className="w-72"
        />
      </div>
    </form>
  )
}

export default UpdateProfile
