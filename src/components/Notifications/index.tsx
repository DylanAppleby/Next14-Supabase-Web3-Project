import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'

import { Bell } from 'components/Icons'
import { useAuth } from 'contexts/AuthContext'
import { supabase } from 'services/supabase'
import { INotification, IUser } from 'types/supabaseTables'

import Item from './Item'

const NotificationSkeleton = () => (
  <div className="flex gap-3 border-b border-lightSilver px-4 py-3 last:border-b-0">
    <Skeleton
      className="aspect-square h-10 w-10 rounded-xl"
      width={40}
      height={40}
    />
    <div className="w-full">
      <Skeleton width={50} />
      <Skeleton width={150} />
    </div>
  </div>
)

const Notifications = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [showNotifications, setShowNotifications] = useState<boolean>(false)
  const [hasNotifications, setHasNotifications] = useState<boolean>(false)

  const { user } = useAuth()

  const handleCheckNotifications = useCallback(async () => {
    if (!user.id) return

    const { count, error } = await supabase
      .rpc(
        'get_user_notifications',
        {
          u_id: user.id,
        },
        { count: 'exact' }
      )
      .eq('checked', false)

    if (count && count > 0) setHasNotifications(true)
    else if (error) toast.error(error.message)
  }, [user.id])

  const handleShowNotifications = useCallback(() => {
    setShowNotifications((val) => !val)
    setHasNotifications(false)
  }, [])

  useEffect(() => {
    handleCheckNotifications()
  }, [handleCheckNotifications])

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true)

    const { data, error } = await supabase.rpc('get_user_notifications', {
      u_id: user.id,
    })
    setIsLoading(false)

    if (data) setNotifications(data)
    else if (error) toast.error(error.message)
  }, [user.id])

  const notificationList = useMemo(
    () =>
      notifications.map((notification) => (
        <Item key={notification.id} notification={notification} />
      )),
    [notifications]
  )

  useEffect(() => {
    const userChannel = supabase
      .channel('public:users')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `type=id.${user.id}`,
        },
        (payload) => {
          const newUser = payload.new as IUser

          if (
            newUser.notifications.toString() !== user.notifications.toString()
          )
            toast.custom(
              <div className="line-clamp-2 flex items-center gap-2 rounded-5 border-stroke bg-darkGreen p-4 text-sm font-semibold text-white/90">
                <Bell className="invert" /> You have a new notification
              </div>
            )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(userChannel)
    }
  }, [user.id, user.notifications])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return (
    <>
      <button
        onClick={handleShowNotifications}
        title="Notifications"
        type="button"
        className="relative"
      >
        <Bell />
        {hasNotifications && (
          <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red" />
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 top-16 z-30 mt-1 max-h-96 w-full min-w-55 max-w-sm overflow-hidden overflow-y-scroll rounded-5 border border-stroke bg-white p-4 pb-20 shadow-xl backdrop-blur-xl scrollbar-none">
          {notificationList}
          {isLoading && (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default memo(Notifications)
