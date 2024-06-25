import Skeleton from 'react-loading-skeleton'

const PersonSkeleton = () => (
  <div className="space-y-5 rounded-5 bg-white p-5">
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
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
      <Skeleton width={120} height={44} className="border border-black/5" />
    </div>
    <div className="flex gap-3">
      <Skeleton
        width={120}
        height={30}
        className="!rounded-full border border-black/5"
      />
      <Skeleton
        width={120}
        height={30}
        className="!rounded-full border border-black/5"
      />
      <Skeleton
        width={120}
        height={30}
        className="!rounded-full border border-black/5"
      />
      <Skeleton
        width={120}
        height={30}
        className="!rounded-full border border-black/5"
      />
    </div>
    <div className="grid grid-cols-3 gap-2">
      <Skeleton height={50} className="rounded-full border border-black/5" />
      <Skeleton height={50} className="rounded-full border border-black/5" />
      <Skeleton height={50} className="rounded-full border border-black/5" />
    </div>
  </div>
)

export default PersonSkeleton
