/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import Head from 'next/head'

import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import {
  Button,
  CircleTag,
  Magnifier,
  PersonCard,
  PersonSkeleton,
} from 'components'
import { Aside, Nav, Section } from 'components/Layout'
import { PageProfile, Social } from 'containers'
import { useAuth } from 'contexts/AuthContext'
import { useCirclesContext } from 'contexts/circlesData'
import { supabase } from 'services/supabase'
import { NextPageWithLayout } from 'types/model'
import { IPerson } from 'types/supabaseTables'

const ProfilePage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchData, setSearchData] = useState<string>('')
  const { circles, setCircles } = useCirclesContext()
  const [selectedCircles, setSelectedCircles] = useState<string[]>([])
  const { user } = useAuth()

  const [people, setPeople] = useState<
    { common_circles_count: number; person: IPerson[] }[]
  >([])

  const fetchPeople = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase.rpc('users_search_users_by_name', {
      name_pattern: searchData,
      circle_list: selectedCircles,
      count: 6,
    })

    if (data) {
      setPeople(
        data.reduce(
          (
            acc: { common_circles_count: number; person: IPerson[] }[],
            userData: IPerson
          ) => {
            const key = acc.findIndex(
              (p) => p.common_circles_count === userData.common_circles_count
            )
            if (key !== -1) {
              acc[key].person.push(userData)
            } else {
              acc.push({
                common_circles_count: userData.common_circles_count,
                person: [userData],
              })
            }
            return acc
          },
          []
        )
      )
    } else if (error) toast.error(error.message)

    setIsLoading(false)
  }, [searchData, selectedCircles])

  const handleCircleSelect = useCallback((id: string) => {
    setSelectedCircles((val) => [...val, id])
  }, [])

  const handleRemoveCircle = useCallback((id: string) => {
    setSelectedCircles((val) => val.filter((cid) => cid !== id))
  }, [])

  const fetchCircle = useCallback(async () => {
    if (!user.id || circles.length > 0) return

    const { data, error } = await supabase.rpc(
      'users_get_user_circles_detailed',
      {
        user_id: user.id,
      }
    )

    if (error) {
      toast.error(error.message)
      return
    }

    setCircles(data)
  }, [circles.length, setCircles, user.id])

  useEffect(() => {
    fetchPeople()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchCircle()
  }, [fetchCircle])

  const personList = useMemo(() => {
    return people.map(({ common_circles_count, person }) => (
      <div key={common_circles_count} className="space-y-5">
        <h2 className="text-lg font-bold ">{common_circles_count} in common</h2>
        {person.map((val) => (
          <PersonCard key={val.selected_user_id} person={val} />
        ))}
      </div>
    ))
  }, [people])

  return (
    <>
      <Head>
        <title>People | Edenverse</title>
        <meta name="description" content="Eden" />
        <meta name="robots" content="index, follow, archive" />
        <meta property="og:type" content="artical" />
        <meta property="og:title" content="Eden || Landing Page" />
        <meta property="og:site_name" content="Eden" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-extrabold">Search People</h1>
        <label
          htmlFor="search"
          className="relative flex items-center overflow-hidden rounded-5 border border-stroke bg-white text-tertiary"
        >
          <input
            type="text"
            id="search"
            title="search"
            className="w-full px-7 py-4 text-xl font-medium outline-none"
            onChange={(e) => {
              setSearchData(e.target.value)
            }}
            placeholder="Search by circles or keywords"
          />
          <Button
            onClick={fetchPeople}
            name="Search"
            className="absolute right-3 aspect-square items-center !rounded-full bg-darkGreen !p-3"
          >
            <Magnifier color="white" />
          </Button>
        </label>
        <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto scrollbar-thin">
          {circles.map((circle) => (
            <CircleTag
              circleData={{
                circle_id: circle.id,
                circle_logo_image: circle.circle_logo_image || '',
                circle_name: circle.name || '',
              }}
              onSelect={handleCircleSelect}
              onUnSelect={handleRemoveCircle}
              isSelected={selectedCircles.includes(circle.id)}
              key={circle.id}
            />
          ))}
        </div>
      </div>
      <h1 className="mb-1 mt-6 font-semibold text-tertiary">People like you</h1>
      {isLoading && <PersonSkeleton />}
      <div className="flex flex-col gap-5 pb-32">{personList}</div>
    </>
  )
}

ProfilePage.getLayout = (page: ReactElement) => (
  <>
    <Nav />
    <Section>{page}</Section>
    <Aside>
      <PageProfile />
      <Social />
    </Aside>
  </>
)

export default ProfilePage
