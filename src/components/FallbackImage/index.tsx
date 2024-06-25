import Image from 'next/image'

import { useEffect, useState } from 'react'

type IFallbackImage = {
  src: string
  defaultSrc: string
  className?: string
  alt?: string
  width: number
  height: number
}

const FallbackImage = ({
  defaultSrc,
  src,
  className,
  alt,
  width,
  height,
}: IFallbackImage) => {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      className={className}
      width={width}
      height={height}
      priority
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(defaultSrc)
        }
      }}
      onError={() => {
        setImgSrc(defaultSrc)
      }}
      alt={alt || ''}
    />
  )
}

export default FallbackImage
