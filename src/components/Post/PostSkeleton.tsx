import { forwardRef, ForwardRefRenderFunction } from 'react'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

const PostSkeleton: ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className="w-full min-w-95 max-w-3xl space-y-2 rounded-5 bg-white p-6"
    >
      <div className="flex w-full gap-1.5">
        <Skeleton
          width={44}
          height={44}
          borderRadius={14}
          className="leading-1 h-11 w-11 rounded-2xl border border-black/5"
        />
        <div>
          <Skeleton
            width={52}
            height={10}
            className="translate-y-1 border border-black/5"
          />
          <Skeleton width={44} height={10} className="border border-black/5" />
        </div>
      </div>
      <div>
        <Skeleton width={320} height={14} className="border border-black/5" />
        <Skeleton width={300} height={14} className="border border-black/5" />
      </div>
      <div className="flex h-5 gap-2">
        <Skeleton width={24} height={14} className="border border-black/5" />
        <Skeleton width={24} height={14} className="border border-black/5" />
      </div>
    </div>
  )
}

export default forwardRef(PostSkeleton)
