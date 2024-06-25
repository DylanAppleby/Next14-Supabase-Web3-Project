/* eslint-disable no-shadow */

import { ICircle } from 'types/supabaseTables'

export enum Paths {
  HOME = '/',
  CREATE = `${HOME}create`,
  CREATE_SEARCH = `${CREATE}/search`,
  CREATE_PUBLISH = `${CREATE}/publish`,
  CIRCLE = `${HOME}circle`,
  CIRCLE_ID = `${CIRCLE}/[id]`,
  PEOPLE = `${HOME}people`,
  PEOPLE_ME = `${PEOPLE}/me`,
  PEOPLE_ID = `${HOME}people/[id]`,
  PEOPLE_UPDATE = `${HOME}people/update`,
  SIGNIN = `${HOME}signin`,
  SIGNUP = `${HOME}signup`,
  COMMENT = `${HOME}comment`,
  POLICY = `${HOME}extension/policy`,
  POST = `${HOME}post`,
  POST_ID = `${POST}/[id]`,
}

export enum Tables {
  CIRCLES = 'circles',
  USERS = 'users',
  NOTIFICATIONS = 'notifications',
  CHECKPOINTS = 'checkpoints',
  MESSAGES = 'messages',
  THREADS = 'threads',
  REQUESTS = 'requests',
  POSTS = 'posts',
  REPLIES = 'replies',
  TAGS = 'tags',
}

export const INITIAL_CIRCLE_DATA: ICircle = {
  id: '',
  name: '',
  post_count: 0,
  user_count: 0,
  circle_logo_image: '',
  created_at: new Date().toDateString(),
  created_by: '',
  description: '',
  tags: [],
}

export const supabaseStorageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media_bucket`
