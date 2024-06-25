import { Database } from './supabase'

export interface IUser {
  avatar_url: string | null
  bio: string | null
  birthday: string | null
  circles: string[]
  created_at: string
  email: string | null
  first_name: string | null
  followees: string[] | null
  followers: string[] | null
  id: string
  last_name: string | null
  notifications: string[]
  read_notifications: string[]
  user_name: string | null
}

export interface ICircle {
  id: string
  name: string | null
  post_count: number
  user_count: number
  created_at?: string
  created_by: string | null
  creator_name?: string
  description?: string | null
  tags?: string[] | null
  circle_logo_image?: string | null
}
export interface IPost {
  id: string
  context: string
  post_image_url: string
  created_at: string
  created_by: string
  created_by_user_name: string
  created_by_user_avatar_url: string
  circle_id: string
  circle_name: string
  circle_url?: string
  likes_count: number
  liked: boolean
  replies_count: number
  imageFile?: File
}

export interface IReplies {
  id: string
  context: string
  created_at: string
  created_by: string
  created_by_user_name: string
  created_by_user_avatar_url: string
  liked: boolean
  liked_count?: number
  reply_count?: number
}

export interface IPostCircle {
  circle_id: string
  context: string | null
  created_at: string
  created_by: string | null
  id: string
  liked: false
  likes_count: 0
  replies: string[]
}

export interface IPerson {
  selected_user_id: string
  selected_user_name: string
  selected_user_avatar_url: string
  posts_context: string[]
  common_circles: Database['public']['CompositeTypes']['common_circle'][]
  common_circles_count: number
}

export interface INotification {
  id: string
  type: string
  post_id?: string | null
  circle_id?: string | null
  thread_id?: string | null
  request_id?: string | null
  user_id: string | null
  user_name: string
  created_at: string
  checked: boolean
  count?: number
}

export interface IMessage {
  content: string
  created_at: string
  id: string
  receiver_id: string
  sender_id: string
  thread_id: string
  is_seen: boolean
}

export interface IFriend {
  id: string
  is_friend: boolean
  created_at: string
  user_name: string
  avatar_url: string
  user_id: string
}

export interface ILastMessage {
  id: string
  created_at: string
  user_name: string
  avatar_url: string
  user_id: string
  content: string
  thread_id: string
  is_seen: boolean
}
