import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import Button from 'components/Button'
import { Menu } from 'components/Icons'
import { supabase } from 'services/supabase'

const Options = ({
  id,
  setShowPost,
}: {
  id: string
  setShowPost: Dispatch<SetStateAction<boolean>>
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeletePost = useCallback(async () => {
    setIsLoading(true)
    const { error } = await supabase.rpc('posts_delete_post_and_replies', {
      post_id: id,
    })
    setIsLoading(false)

    if (error) toast.error(error.message)
    else setShowPost(false)
  }, [id, setShowPost])

  return (
    <div className="absolute right-0 flex flex-col items-end gap-1">
      <button type="button" onClick={() => setShowOptions((val) => !val)}>
        <Menu className="opacity-60" />
      </button>
      {showOptions && (
        <div className="absolute top-6 w-40 overflow-hidden rounded-md">
          <Button
            onClick={handleDeletePost}
            isLoading={isLoading}
            className="w-full bg-red px-2 py-1.5 text-sm font-medium text-white"
          >
            Delete Post
          </Button>
        </div>
      )}
    </div>
  )
}

export default Options
