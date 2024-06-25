/* eslint-disable @next/next/no-img-element */
const AvatarImage = ({ avatarSrc }: { avatarSrc?: string | null }) =>
  avatarSrc ? (
    <img
      src={avatarSrc}
      alt="avatar"
      width="100"
      height="100"
      className="h-24 w-24 rounded-3xl"
    />
  ) : (
    <div className="h-24 w-24 rounded-3xl bg-lightGray" />
  )

export default AvatarImage
