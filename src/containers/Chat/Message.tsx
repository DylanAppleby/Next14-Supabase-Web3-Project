import { useCallback, useEffect, useState } from 'react'

import classNames from 'classnames'
import { supabase } from 'services/supabase'
import { IMessage } from 'types/supabaseTables'

const Message = ({
  message,
  isSender,
}: {
  message: IMessage
  isSender: boolean
}) => {
  const [messageData, setMessageData] = useState<IMessage>(message)

  const handleReadReceipt = useCallback(async () => {
    if (isSender || message.is_seen) return
    const { error } = await supabase
      .from('messages')
      .update({ is_seen: true })
      .eq('id', message.id)

    if (!error) setMessageData((val) => ({ ...val, is_seen: true }))
  }, [isSender, message.id, message.is_seen])

  useEffect(() => {
    handleReadReceipt()
  }, [handleReadReceipt])

  return (
    <p
      className={classNames('flex w-full', {
        'justify-end': isSender,
      })}
    >
      <span
        className={classNames(
          'relative w-max max-w-4/5 rounded-2xl p-4 text-sm',
          {
            'rounded-br-none bg-darkGreen text-white': isSender,
            'rounded-bl-none bg-secondary': !isSender,
          }
        )}
      >
        {messageData.content}
        {messageData.is_seen && isSender && (
          <span className="absolute bottom-0 right-2 text-2.5 font-semibold text-black/20">
            seen
          </span>
        )}
      </span>
    </p>
  )
}

export default Message
