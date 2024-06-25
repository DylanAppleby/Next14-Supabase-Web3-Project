import { ReactNode, useMemo, useState } from 'react'

import { ICircle, IPost } from 'types/supabaseTables'

import { AuthProvider } from './AuthContext'
import { CirclesContext } from './circlesData'
import { INITIAL_POST_DATA, PostDataContext } from './postData'
import { PostsProvider } from './postsData'

const Context = ({ children }: { children: ReactNode }) => {
  const [postData, setPostData] = useState<IPost>(INITIAL_POST_DATA)
  const [circles, setCircles] = useState<ICircle[]>([])

  const postDataContextValue = useMemo(
    () => ({
      postData,
      setPostData,
    }),
    [postData]
  )

  const circlesContextValue = useMemo(
    () => ({
      circles,
      setCircles,
    }),
    [circles]
  )

  return (
    <AuthProvider>
      <CirclesContext.Provider value={circlesContextValue}>
        <PostDataContext.Provider value={postDataContextValue}>
          <PostsProvider>{children}</PostsProvider>
        </PostDataContext.Provider>
      </CirclesContext.Provider>
    </AuthProvider>
  )
}

export default Context
