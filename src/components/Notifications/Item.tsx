import { useRouter } from 'next/router'

import { useCallback, useEffect, useMemo, useState } from 'react'

import classNames from 'classnames'
import { supabase } from 'services/supabase'
import { INotification } from 'types/supabaseTables'
import { Paths, Tables } from 'utils/constants'
import timeSince from 'utils/timeSince'

const Item = ({ notification }: { notification: INotification }) => {
  const [detailData, setDetailData] = useState<string>('')
  const router = useRouter()

  const handleNotificationDetails = useCallback(() => {
    if (notification.circle_id)
      supabase
        .from(Tables.CIRCLES)
        .select('name')
        .eq('id', notification.circle_id)
        .single()
        .then(({ data }) => {
          setDetailData(data?.name || '')
        })
    else if (notification.post_id)
      supabase
        .from(Tables.POSTS)
        .select('context')
        .eq('id', notification.post_id)
        .single()
        .then(({ data }) => {
          setDetailData(data?.context || '')
        })
  }, [notification.circle_id, notification.post_id])

  useEffect(() => {
    handleNotificationDetails()
  }, [handleNotificationDetails])

  const handleMarkAsRead = async () => {
    await supabase.rpc('mark_notification_as_read', {
      notification_id: notification.id,
    })

    if (notification.type === 'post' || notification.type === 'circle')
      router.push(
        notification.type === 'post'
          ? `${Paths.POST}/${notification.post_id}`
          : `${Paths.CIRCLE}/${notification.circle_id}`
      )
  }

  const content = useMemo(() => {
    switch (notification.type) {
      case 'circle':
        return (
          <>
            {notification.user_name} Joined <strong>{detailData}</strong> of
            your circles
          </>
        )
      case 'post':
        return (
          <>
            {notification.user_name} Created the Post &quot;
            <strong>{detailData}</strong>&quot;
          </>
        )
      case 'request':
        return (
          <>
            You have received a friend request from
            <strong> {notification.user_name} </strong>
          </>
        )
      case 'message':
        return (
          <>
            You have received <strong> {notification.count} </strong> messages
            from
            <strong> {notification.user_name} </strong>
          </>
        )
      default:
        return null
    }
  }, [
    detailData,
    notification.count,
    notification.type,
    notification.user_name,
  ])

  return (
    <div
      onClick={handleMarkAsRead}
      className="flex gap-3 border-b border-lightSilver py-3 transition-colors first:pt-0 last:border-b-0 hover:bg-white"
    >
      <div className="w-full">
        <h2 className="flex w-full justify-between text-sm font-semibold text-black/60">
          {timeSince(notification.created_at)}
        </h2>
        <p
          className={classNames('line-clamp-1 space-x-1', {
            'opacity-60': notification.checked,
          })}
        >
          {content}
        </p>
      </div>
    </div>
  )
}

export default Item
