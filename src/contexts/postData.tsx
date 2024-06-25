import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { IPost } from 'types/supabaseTables'

export const INITIAL_POST_DATA: IPost = {
  id: '',
  context: '',
  post_image_url: '',
  created_at: '',
  created_by: '',
  liked: false,
  likes_count: 0,
  replies_count: 0,
  circle_name: '',
  created_by_user_name: '',
  created_by_user_avatar_url: '',
  circle_id: '',
}

export const PostDataContext = createContext<{
  postData: IPost
  setPostData: Dispatch<SetStateAction<IPost>>
}>({
  postData: INITIAL_POST_DATA,
  setPostData: () => INITIAL_POST_DATA,
})

export const usePostContext = () => useContext(PostDataContext)
