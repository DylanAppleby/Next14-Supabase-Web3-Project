# Supabas Reference

## Supbase Tables

### [checkpoints](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/28933)

  |id| url  |circles|hashed_content|created_at|
  |--|------|-------|--------------|----------|
  |72b17320-85aa-4b11-a490-99528d345a83|<https://www.w3schools.com/jsref/jsref_substring.asp>|["98bfb456-0050-4962-8717-ad0e7a7c5f65","0d947f38-f9d9-4c14-8d90-7165898cfd66"]|some content|2023-10-18 23:23:35:173308+00|

### [circles](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/28799)

| id | name | description | created_at | tags |
|----|------|-------------|------------|------|
|275e7811-a0a4-47f3-a735-62fc984354f1|Sunshine the youtuber|bla bla bla|2023-10-18 23:23:35:173308+00|["youtube"]|

### [posts](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/28760)

| id | context | replies | created_at | created_by | circle_id | likes |
|----|---------|---------|------------|------------|-----------|-------|
|7cf7923f-ecf5-4ad7-ba1a-8845e3abf2d5|test context|["5e9935ed-fc97-4130-8fb5-c1c72925ddfa"]|2023-10-18 23:23:35:173308+00|04e2672c-3c12-4e4b-96a1-c72918477e00|275e7811-a0a4-47f3-a735-62fc984354f1|["04e2672c-3c12-4e4b-96a1-c72918477e00"]

### [replies](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/28915)

| id | context | post_id | reply_to_post | created_at | created_by| parend_id|
|----|---------|---------|---------------|------------|-----------|---|
|5e9935ed-fc97-4130-8fb5-c1c72925ddfa|My First Reply|bf60efda-79b2-4acd-af97-f82cfb7aa805|FALSE|2023-10-18 23:23:35:173308+00|313462b1-6a67-4de9-8bb7-e802366e6664|7cf7923f-ecf5-4ad7-ba1a-8845e3abf2d5|

### [tags](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/31694)

| id | created_at | tag_name |
|----|------------|----------|
|f9235dc0-a0c8-470e-bdf0-10409be21400|2023-10-18 23:23:35:173308+00|youtube|

### [users](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/editor/28684)

| id | first_name | last_name | created_at | birthday | followers | followees | email | circles | user_name | bio |
|----|------------|-----------|------------|----------|-----------|-----------|-------|---------|-----------|-----|
|04e2672c-3c12-4e4b-96a1-c72918477e00|Test|User|2023-10-18 23:23:35:173308+00|05/13/1990|[]|[]|<test@example.com>|["fdacd1cb-fd34-4488-9115-c1c1e415b088","275e7811-a0a4-47f3-a735-62fc984354f1"]|username|Work, Earn, Repeat|

## RPC Functions

### [auth_does_email_exist](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=auth_does_email_exist)

A function for checking if email exists on Supabase auth table

* Function Arguments

  * `email_address: string`

* Return Type

  * `boolean`

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('auth_does_email_exist', {
      email_address
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [circles_checkpoint_add_new_record](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=circles_checkpoint_add_new_record)

A function for adding new record to checkpoints

* Function Arguments

  * `p_circlename: string`
  * `p_url: string`

* Return Type

  * `void`

* Function Call

  ```javascript
  let { data, error } = await supabase
  .rpc('circles_checkpoint_add_new_record', {
    p_circlename, 
    p_url
  })

  if (error) console.error(error)
  else console.log(data)
  ```

### [circles_get_circle_names_by_url](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=circles_get_circle_names_by_url)

A function for getting circle names that have specific url

* Function Arguments

  * `p_url: string`

* Return Type

  * `string[]`

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('circles_get_circle_names_by_url', {
      p_url
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [does_username_exist](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=does_username_exist)

A function for checking if username exists or not

* Function Arguments

  * `p_username: string`

* Return Type

  * `boolean`


* Function Call

  ```javascript
  let { data, error } = await supabase
  .rpc('does_username_exist', {
    p_username
  })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_check_liked_by_user_id](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_check_liked_by_user_id)

A function for checking if the user liked the post

* Function Arguments

  * `post_id: string`
  * `user_id: string`

* Return Type

  * `boolean`

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_check_liked_by_user_id', {
      post_id, 
      user_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_get_all_posts_by_circles_user_in](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_get_all_posts_by_circles_user_in)

A function for getting all posts by circles that user in

* Function Arguments

  * `user_id: string`

* Return Type

  ```javascript
    [
      {
        id:string,
        context: string,
        replies_count: number,
        created_at: Timestamp,
        created_by: string,
        circle_id: string,
        likes_count: number,
        liked:boolean
      },
      ...
    ]
  ```

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_get_all_posts_by_circles_user_in', {
      user_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_get_all_posts_by_circles](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_get_all_posts_by_circles)

A function for getting all posts by circles

* Function Arguments

  * `circle_ids: string[]`

* Return Type

  ```javascript
    [
      {
        id:string,
        context: string,
        replies_count: number,
        created_at: Timestamp,
        created_by: string,
        circle_id: string,
        likes_count: number,
        liked:boolean
      },
      ...
    ]
  ```

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_get_all_posts_by_circles', {
      circle_ids
    })
  
  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_get_likes_count](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_get_likes_count)

A function for getting likes count of the post

* Function Arguments

  * post_id: string

* Return Type

  * `number`

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_get_likes_count', {
      post_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_get_posts_by_circle_id](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_get_posts_by_circle_id)

A function for getting all posts by circle id

* Function Arguments

  * c_id: string

* Return Type

  ```javascript
    [
      {
        id:string,
        context: string,
        replies_count: number,
        created_at: Timestamp,
        created_by: string,
        circle_id: string,
        likes_count: number,
        liked:boolean
      },
      ...
    ]
  ```

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_get_posts_by_circle_id', {
      c_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_get_posts_by_user_id](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_get_posts_by_user_id)

A function for getting all posts that user posted

* Function Arguments

  * user_id: string

* Return Type

  ```javascript
    [
      {
        id:string,
        context: string,
        replies_count: number,
        created_at: Timestamp,
        created_by: string,
        circle_id: string,
        likes_count: number,
        liked:boolean
      },
      ...
    ]
  ```

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_get_posts_by_user_id', {
      user_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [posts_like_unlike](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=posts_like_unlike)

A function for like/unlike operations on post

* Function Arguments

  * liked: boolean
  * post_id: string
  * user_id: string

* Return Type
  * boolean

* Function Call

  ```javascript
  let { data, error } = await supabase
    .rpc('posts_like_unlike', {
      liked, 
      post_id, 
      user_id
    })

  if (error) console.error(error)
  else console.log(data)
  ```

### [replies_get_all_replies_by_parent_id](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=replies_get_all_replies_by_parent_id)

A function for getting all replies by parent_id

* Function Arguments

  * prt_id: string

* Return Type

  ```javascript
    [
      {
        id:string,
        context: string,
        created_at: Timestamp,
        created_by: string,
        replies_count: number
      },
      ...
    ]
  ```

* Function Call

  ```javascript
  let { data, error } = await supabase
  .rpc('replies_get_all_replies_by_parent_id', {
    prt_id
  })

  if (error) console.error(error)
  else console.log(data)

  ```

### [users_get_user_circles](https://supabase.com/dashboard/project/fysmrdbevwxphtrsevkn/api?rpc=users_get_user_circles)

This function returns a list of circles' uuid given the user id input

* Function Arguments
  * user_id: `string`

* Return Type
  * `string[]`

* Function Call

  ```javascript
  let { data, error } = await supabase
  .rpc('users_get_user_circles', {
    user_id
  })

  if (error) console.error(error)
  else console.log(data)
  ```

## Upload Files

Refer to this [document](https://supabase.com/docs/reference/javascript/storage-from-upload) for the detailed information

* Parameters
  * **`path`** (reqiured) **string** \
    The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload

  * **`fileBody`** (reqiured) **FileBody**\
  The body of the file to be stored in the bucket.

  * **`fileOptions`** (optional) **FileOptions**

### uploading avatar example

```javascript
const avatarFile = event.target.files[0]
const { data, error } = await supabase
  .storage
  .from('media_bucket') // bucket name
  .upload('avatars/avatar1.png', avatarFile, {
    cacheControl: '3600',
    upsert: false
  })
```

### uploading post image example

```javascript
const postImageFile = event.target.files[0]
const { data, error } = await supabase
  .storage
  .from('media_bucket') // bucket name
  .upload('postImages/postImage1.png', postImageFile, {
    cacheControl: '3600',
    upsert: false
})
```

#### URL type of uploaded file

{supabase_url}/storage/v1/object/public/{bucket_name}/folder/[subfolder]/filename\
<https://fysmrdbevwxphtrsevkn.supabase.co/storage/v1/object/public/media_bucket/avatars/image1.jpg>
