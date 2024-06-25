import Link from 'next/link'

import AvatarImage from 'components/AvatarImage'
import { Pencil } from 'components/Icons'
import { IUser } from 'types/supabaseTables'
import { Paths } from 'utils/constants'

const Profile = ({ user, signOut }: { user: IUser; signOut?: () => void }) => (
  <div className="relative flex w-full flex-col items-center gap-2.5 rounded-5 bg-white px-6 pb-6 pt-8">
    {signOut && (
      <Link
        href={Paths.PEOPLE_UPDATE}
        className="absolute right-4 top-4 flex h-min items-center gap-1 rounded-xl bg-black/10 p-2 text-sm font-bold text-black/90"
      >
        <Pencil />
        Edit
      </Link>
    )}
    <AvatarImage avatarSrc={user.avatar_url} />
    <h1 className="text-2xl font-semibold">
      {user.first_name} {user.last_name}
    </h1>
    <h2 className="text-xl font-medium text-black/60">{user.user_name}</h2>
    <p className="text-xl font-medium text-black/60">{user.bio}</p>
    {signOut && (
      <button
        type="button"
        onClick={signOut}
        className="rounded-md bg-red px-4 py-2 font-medium text-white"
      >
        Logout
      </button>
    )}
  </div>
)

export default Profile
