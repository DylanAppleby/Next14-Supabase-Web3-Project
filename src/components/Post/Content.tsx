/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import { memo, useCallback, useMemo, useState } from 'react'
import Linkify from 'react-linkify'

import classNames from 'classnames'
import { ExternalLink } from 'components/Icons'
import { SuccessResult } from 'open-graph-scraper'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

const Content = ({
  text,
  showLinkPreview,
}: {
  text: string
  showLinkPreview: boolean
}) => {
  const [linkData, setLinkData] = useState<OgObject>()
  const [hasError, setHasError] = useState<boolean>(false)

  const renderLink = useCallback((val: string) => {
    fetch('/api/metadata', {
      method: 'POST',
      body: JSON.stringify({ url: val }),
    })
      .then((res) => res.json())
      .then(({ result }: SuccessResult) => {
        setLinkData(result)
      })
    return (
      <Link
        id={val}
        href={val}
        target="_blank"
        className="line-clamp-1 text-blue-500 hover:underline"
      >
        {val}
      </Link>
    )
  }, [])

  const content = useMemo(
    () => (
      <Linkify componentDecorator={renderLink}>
        <p className="break-words text-xl text-black/90">{text}</p>
      </Linkify>
    ),
    [renderLink, text]
  )

  return (
    <>
      {content}
      {showLinkPreview && linkData && linkData.ogTitle && (
        <div className="flex max-h-44 gap-4 overflow-hidden rounded-5 border border-stroke bg-secondary/60 p-5">
          {linkData.ogImage && [0] && (
            <img
              src={linkData.ogImage[0].url || ''}
              alt={linkData.ogTitle}
              className={classNames(
                'max-h-28 max-w-44 rounded-lg bg-black object-contain',
                { hidden: hasError }
              )}
              onError={() => setHasError(true)}
            />
          )}
          <div className="space-y-3 p-2">
            <Link
              href={linkData.requestUrl || ''}
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-tertiary"
            >
              <ExternalLink />
              <span className="translate-y-0.5">External Link </span>
            </Link>
            <p className="line-clamp-2 text-xl font-medium text-darkGray">
              {linkData.ogTitle}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(Content)
