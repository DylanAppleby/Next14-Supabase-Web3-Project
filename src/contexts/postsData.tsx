import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { IPost } from 'types/supabaseTables'

export const PostsContext = createContext<{
  posts: IPost[]
  setPosts: Dispatch<SetStateAction<IPost[]>>
}>({
  posts: [],
  setPosts: () => [],
})

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([])

  const postsContextValue = useMemo(
    () => ({
      posts,
      setPosts,
    }),
    [posts]
  )
  return (
    <PostsContext.Provider value={postsContextValue}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePostsContext = () => useContext(PostsContext)
