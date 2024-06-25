export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      checkpoints: {
        Row: {
          circles: string[] | null
          created_at: string
          hashed_content: string | null
          id: string
          url: string | null
        }
        Insert: {
          circles?: string[] | null
          created_at?: string
          hashed_content?: string | null
          id?: string
          url?: string | null
        }
        Update: {
          circles?: string[] | null
          created_at?: string
          hashed_content?: string | null
          id?: string
          url?: string | null
        }
        Relationships: []
      }
      circles: {
        Row: {
          circle_logo_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string | null
          post_count: number
          tags: string[] | null
          user_count: number
        }
        Insert: {
          circle_logo_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          post_count?: number
          tags?: string[] | null
          user_count?: number
        }
        Update: {
          circle_logo_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          post_count?: number
          tags?: string[] | null
          user_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'circles_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_seen: boolean
          receiver_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          is_seen?: boolean
          receiver_id: string
          sender_id: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_seen?: boolean
          receiver_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_messages_friend_id_fkey'
            columns: ['thread_id']
            isOneToOne: false
            referencedRelation: 'threads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_messages_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      notifications: {
        Row: {
          circle_id: string | null
          created_at: string
          id: string
          post_id: string | null
          receiver_id: string | null
          request_id: string | null
          thread_id: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          circle_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          receiver_id?: string | null
          request_id?: string | null
          thread_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          circle_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          receiver_id?: string | null
          request_id?: string | null
          thread_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_circle_id_fkey'
            columns: ['circle_id']
            isOneToOne: false
            referencedRelation: 'circles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_request_id_fkey'
            columns: ['request_id']
            isOneToOne: false
            referencedRelation: 'requests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_thread_id_fkey'
            columns: ['thread_id']
            isOneToOne: false
            referencedRelation: 'threads'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      posts: {
        Row: {
          circle_id: string
          context: string | null
          created_at: string
          created_by: string
          id: string
          likes: string[]
          post_image_url: string | null
          replies: string[] | null
        }
        Insert: {
          circle_id: string
          context?: string | null
          created_at?: string
          created_by: string
          id?: string
          likes?: string[]
          post_image_url?: string | null
          replies?: string[] | null
        }
        Update: {
          circle_id?: string
          context?: string | null
          created_at?: string
          created_by?: string
          id?: string
          likes?: string[]
          post_image_url?: string | null
          replies?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: 'posts_circle_id_fkey'
            columns: ['circle_id']
            isOneToOne: false
            referencedRelation: 'circles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'posts_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      replies: {
        Row: {
          context: string
          created_at: string
          created_by: string
          id: string
          likes: string[]
          parent_id: string | null
          reply_to_post: boolean
        }
        Insert: {
          context: string
          created_at?: string
          created_by: string
          id?: string
          likes?: string[]
          parent_id?: string | null
          reply_to_post?: boolean
        }
        Update: {
          context?: string
          created_at?: string
          created_by?: string
          id?: string
          likes?: string[]
          parent_id?: string | null
          reply_to_post?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'replies_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id?: string
          thread_id: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_friendRequests_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_friendRequests_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_requests_thread_id_fkey'
            columns: ['thread_id']
            isOneToOne: false
            referencedRelation: 'threads'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          tag_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_name: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_name?: string
        }
        Relationships: []
      }
      threads: {
        Row: {
          created_at: string
          id: string
          is_friend: boolean
          user_one: string
          user_two: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_friend?: boolean
          user_one?: string
          user_two: string
        }
        Update: {
          created_at?: string
          id?: string
          is_friend?: boolean
          user_one?: string
          user_two?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_friends_user_one_fkey'
            columns: ['user_one']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_friends_user_two_fkey'
            columns: ['user_two']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users: {
        Row: {
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
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          circles?: string[]
          created_at?: string
          email?: string | null
          first_name?: string | null
          followees?: string[] | null
          followers?: string[] | null
          id: string
          last_name?: string | null
          notifications?: string[]
          read_notifications?: string[]
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          circles?: string[]
          created_at?: string
          email?: string | null
          first_name?: string | null
          followees?: string[] | null
          followers?: string[] | null
          id?: string
          last_name?: string | null
          notifications?: string[]
          read_notifications?: string[]
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_does_email_exist: {
        Args: {
          email_address: string
        }
        Returns: boolean
      }
      check_auth_user_is_in_the_circle: {
        Args: {
          circleid: string
        }
        Returns: boolean
      }
      check_if_circle_exist:
        | {
            Args: {
              circle_name: string
            }
            Returns: string
          }
        | {
            Args: {
              circle_name: string
              p_circle_context: string
            }
            Returns: boolean
          }
      check_request_of_user: {
        Args: {
          user_id: string
        }
        Returns: {
          sender_id: string
          receiver_id: string
          created_at: string
          thread_id: string
        }[]
      }
      check_user_is_in_the_circle: {
        Args: {
          userid: string
          circleid: string
        }
        Returns: boolean
      }
      circles_checkpoint_add_new_with_genesis_post: {
        Args: {
          p_url: string
          p_circle_name: string
          p_circle_description: string
          circle_tags: string[]
        }
        Returns: string
      }
      circles_checkpoint_add_new_with_tags_return_id: {
        Args: {
          p_url: string
          p_circle_name: string
          p_circle_description: string
          circle_tags: string[]
        }
        Returns: string
      }
      circles_claim_circle: {
        Args: {
          p_url: string
          circle_id: string
        }
        Returns: undefined
      }
      circles_get_circle_name_and_description_by_id: {
        Args: {
          circle_id: string
        }
        Returns: {
          name: string
          description: string
        }[]
      }
      circles_get_circle_names_by_url: {
        Args: {
          p_url: string
        }
        Returns: string[]
      }
      circles_get_circles_by_url: {
        Args: {
          p_url: string
        }
        Returns: {
          id: string
          name: string
          description: string
          tags: string[]
          circle_logo_image: string
          created_by: string
        }[]
      }
      circles_get_circles_info: {
        Args: {
          circles_list: string[]
        }
        Returns: {
          id: string
          name: string
          post_count: number
          user_count: number
          created_by: string
        }[]
      }
      circles_get_circles_info_detailed: {
        Args: {
          circles_list: string[]
        }
        Returns: {
          id: string
          name: string
          description: string
          post_count: number
          user_count: number
          created_by: string
          creator_name: string
          circle_logo_image: string
        }[]
      }
      circles_get_user_circles_count: {
        Args: {
          userid: string
        }
        Returns: number
      }
      delete_my_notification: {
        Args: {
          notification_id: string
        }
        Returns: undefined
      }
      does_username_exist: {
        Args: {
          p_username: string
        }
        Returns: boolean
      }
      get_all_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          id: string
          tag_name: string
        }[]
      }
      get_my_notifications: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          type: string
          post_id: string
          circle_id: string
          user_id: string
          user_name: string
          user_avatar_url: string
          created_at: string
          checked: boolean
        }[]
      }
      get_posts_by_tags: {
        Args: {
          taglist: string[]
          count: number
          since: string
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      get_recommended_posts: {
        Args: {
          count: number
          since: string
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      get_related_circles_by_circle_ids: {
        Args: {
          circle_ids: string[]
        }
        Returns: {
          id: string
          name: string
          description: string
          tags: string[]
          circle_logo_image: string
          created_by: string
        }[]
      }
      get_replies_count_by_parent_id: {
        Args: {
          p_id: string
        }
        Returns: number
      }
      get_similar_circles_from_tags: {
        Args: {
          tag_names: string[]
        }
        Returns: {
          id: string
          name: string
          description: string
          tags: string[]
          circle_logo_image: string
          created_by: string
        }[]
      }
      get_similar_tags: {
        Args: {
          tag_names: string[]
        }
        Returns: {
          tag_id: string
          tag_name: string
          is_matched: boolean
        }[]
      }
      get_total_likes: {
        Args: {
          userid: string
        }
        Returns: number
      }
      get_user_avatar_by_id: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_circles: {
        Args: {
          userid: string
        }
        Returns: {
          circle_logo_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string | null
          post_count: number
          tags: string[] | null
          user_count: number
        }[]
      }
      get_user_ids_in_circle: {
        Args: {
          circle_id: string
        }
        Returns: string[]
      }
      get_user_name_by_id: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_notifications: {
        Args: {
          u_id: string
        }
        Returns: {
          id: string
          type: string
          post_id: string
          circle_id: string
          user_id: string
          user_name: string
          user_avatar_url: string
          created_at: string
          checked: boolean
        }[]
      }
      get_user_notifications_test: {
        Args: {
          u_id: string
        }
        Returns: {
          id: string
          type: string
          post_id: string
          circle_id: string
          thread_id: string
          request_id: string
          user_id: string
          user_name: string
          user_avatar_url: string
          created_at: string
          checked: boolean
          count: number
        }[]
      }
      get_user_tags: {
        Args: {
          user_id: string
        }
        Returns: string[]
      }
      get_users_in_circle: {
        Args: {
          circle_id: string
        }
        Returns: {
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
        }[]
      }
      get_users_in_my_circles: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          first_name: string
          last_name: string
          user_name: string
          email: string
          shared_circles: string[]
        }[]
      }
      mark_notification_as_read: {
        Args: {
          notification_id: string
        }
        Returns: undefined
      }
      mark_notification_as_unread: {
        Args: {
          notification_id: string
        }
        Returns: undefined
      }
      messages_get_thread_last_message_list: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          created_at: string
          user_name: string
          avatar_url: string
          user_id: string
          content: string
          thread_id: string
          is_seen: boolean
        }[]
      }
      messages_insert_message: {
        Args: {
          thread_id: string
          receiver_id: string
          content: string
        }
        Returns: undefined
      }
      posts_check_liked_by_user_id: {
        Args: {
          user_id: string
          post_id: string
        }
        Returns: boolean
      }
      posts_create_post: {
        Args: {
          context: string
          circle_id: string
        }
        Returns: undefined
      }
      posts_create_post_with_post_image_url: {
        Args: {
          context: string
          circle_id: string
          url: string
        }
        Returns: string
      }
      posts_delete_post: {
        Args: {
          post_id: string
        }
        Returns: undefined
      }
      posts_delete_post_and_replies: {
        Args: {
          post_id: string
        }
        Returns: undefined
      }
      posts_get_all_posts: {
        Args: {
          since: string
          count: number
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      posts_get_all_posts_by_circles: {
        Args: {
          circle_ids: string[]
          since: string
          count: number
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          replies_count: number
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
        }[]
      }
      posts_get_all_posts_by_circles_user_in: {
        Args: {
          user_id: string
          since: string
          count: number
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          replies_count: number
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
        }[]
      }
      posts_get_likes_count: {
        Args: {
          post_id: string
        }
        Returns: number
      }
      posts_get_posts_by_id: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      posts_get_posts_by_user_id: {
        Args: {
          user_id: string
          since: string
          count: number
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      posts_get_reply_count: {
        Args: {
          post_id: string
        }
        Returns: number
      }
      posts_get_search_posts: {
        Args: {
          circlelist: string[]
          count: number
          since: string
          searchtext: string
        }
        Returns: {
          id: string
          context: string
          post_image_url: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          circle_id: string
          circle_name: string
          likes_count: number
          liked: boolean
          replies_count: number
        }[]
      }
      posts_like_unlike: {
        Args: {
          post_id: string
        }
        Returns: boolean
      }
      replies_check_liked_by_user: {
        Args: {
          reply_id: string
        }
        Returns: boolean
      }
      replies_get_all_replies_by_parent_id: {
        Args: {
          prt_id: string
        }
        Returns: {
          id: string
          context: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          replies_count: number
        }[]
      }
      replies_get_like_count: {
        Args: {
          reply_id: string
        }
        Returns: number
      }
      replies_get_reply_count: {
        Args: {
          reply_id: string
        }
        Returns: number
      }
      replies_get_second_level_replies: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          context: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          liked: boolean
          liked_count: number
        }[]
      }
      replies_get_top_level_replies: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          context: string
          created_at: string
          created_by: string
          created_by_user_name: string
          created_by_user_avatar_url: string
          liked: boolean
          liked_count: number
          reply_count: number
        }[]
      }
      replies_like_unlike: {
        Args: {
          reply_id: string
        }
        Returns: boolean
      }
      replies_make_reply: {
        Args: {
          context: string
          reply_to: string
          reply_to_post: boolean
        }
        Returns: undefined
      }
      requests_create_new_request: {
        Args: {
          friend_id: string
        }
        Returns: undefined
      }
      requests_handle_friend_request: {
        Args: {
          t_id: string
          accept_request: boolean
        }
        Returns: undefined
      }
      tags_add_new: {
        Args: {
          tag_names: string[]
        }
        Returns: string[]
      }
      tags_add_new_return_all_ids: {
        Args: {
          tag_names: string[]
        }
        Returns: string[]
      }
      threads_create_new_thread: {
        Args: {
          friend_id: string
        }
        Returns: string
      }
      threads_get_thread_id: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      threads_get_threads_list: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          created_at: string
          is_friend: boolean
          user_name: string
          avatar_url: string
          user_id: string
        }[]
      }
      users_get_unique_users_count_in_circles: {
        Args: {
          userid: string
        }
        Returns: number
      }
      users_get_user_circles: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          post_count: number
          user_count: number
          created_by: string
          circle_logo_image: string
        }[]
      }
      users_get_user_circles_detailed: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          description: string
          post_count: number
          user_count: number
          created_by: string
          creator_name: string
          circle_logo_image: string
        }[]
      }
      users_join_circle: {
        Args: {
          circle_id: string
        }
        Returns: undefined
      }
      users_leave_circle: {
        Args: {
          circle_id: string
        }
        Returns: undefined
      }
      users_search_users_by_name: {
        Args: {
          name_pattern: string
          circle_list: string[]
          count: number
        }
        Returns: {
          selected_user_id: string
          selected_user_name: string
          selected_user_avatar_url: string
          posts_context: string[]
          common_circles: Database['public']['CompositeTypes']['common_circle'][]
          common_circles_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      common_circle: {
        circle_id: string | null
        circle_name: string | null
        circle_logo_image: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
