import Link from 'next/link'

import FallbackImage from 'components/FallbackImage'
import { People } from 'components/Icons'
import { ICircle } from 'types/supabaseTables'
import { supabaseStorageUrl } from 'utils/constants'

const CircleCard = ({ circle }: { circle: ICircle }) => (
  <div className="flex h-64 w-56 flex-col items-center justify-between gap-3 rounded-5 bg-white px-8 py-7 shadow-blackLight">
    {circle.circle_logo_image && (
      <FallbackImage
        src={circle.circle_logo_image}
        alt="Circle"
        width={129}
        height={129}
        defaultSrc={`${supabaseStorageUrl}/circle_images/default.jpg`}
        className="aspect-square h-32 w-32 rounded-full bg-zinc-100"
      />
    )}
    <div className="flex h-full flex-col justify-between space-y-1.5 text-center">
      <Link
        title={circle.name || ''}
        href={`/circle/${circle.id}`}
        className="line-clamp-1 text-lg font-bold leading-6 hover:underline"
      >
        {circle.name}
      </Link>
      <div className="space-y-1">
        <div className="flex items-center justify-center text-xs font-medium text-black/40">
          <p className="border-r border-black/10 px-2">
            {circle.post_count} Posts
          </p>
          <p className="flex items-center gap-1 px-2">
            <People className="-translate-y-0.25 opacity-40" />
            {circle.user_count}
          </p>
        </div>
        <p className="text-xs font-medium text-black/40">
          Joined on
          {circle.created_at}
        </p>
      </div>
    </div>
  </div>
)

export default CircleCard
