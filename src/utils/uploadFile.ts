import toast from 'react-hot-toast'

import { supabase } from 'services/supabase'

import { supabaseStorageUrl } from './constants'

export const uploadImage = async (
  photoFile: File,
  folder: 'avatars' | 'post_images',
  name: string
) => {
  const bucket = supabase.storage.from('media_bucket')
  const fileName = `${folder}/${name}`

  const { data, error } = await bucket.upload(fileName, photoFile, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) toast.error(error.message)
  else if (data)
    return {
      url: `${supabaseStorageUrl}/${fileName}`,
      onDelete: async () => {
        const { error: delError } = await bucket.remove([fileName])

        if (delError) toast.error(delError.message)
      },
    }

  return {
    url: '',
    onDelete: async () => {},
  }
}
