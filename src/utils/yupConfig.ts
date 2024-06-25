import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup)

// for login, add password and email validation
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide valid email')
    .required('Please input your email'),
  password: yup
    .string()
    .password()
    .minRepeating(3, 'Repeated characters are not allowed')
    .required('Please input your password'),
})

// for adding user infos
export const UserInfoSchema = yup.object().shape({
  userName: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(20, 'maximum 32 text character allowed')
    .required('Please input first name'),
  bio: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(100, 'maximum 100 text character allowed')
    .required('Please input description'),
})

// for register
export const RegisterSchema = yup.object().shape({
  firstName: yup.string().max(32, 'maximum 20 text character allowed'),
  lastName: yup.string().max(32, 'maximum 20 text character allowed'),
  userName: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input user name'),
  email: yup
    .string()
    .email('Please provide valid email')
    .required('Please input your email'),
  password: yup
    .string()
    .password()
    .minRepeating(3, 'Repeated characters are not allowed')
    .required('Please input your password'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Please input your password confirmation'),
  bio: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(100, 'maximum 100 text character allowed'),
})

export const UpdatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .password()
    .minRepeating(3, 'Repeated characters are not allowed')
    .required('Please input your password'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Please input your password confirmation'),
})

export const UpdateEditCircleSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input circle name'),
  description: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(100, 'maximum 100 text character allowed')
    .required('Please input circle description'),
})

export const SetupProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input user name'),
  lastName: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input user name'),
  userName: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input user name'),
  bio: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(100, 'maximum 100 text character allowed'),
})

export const ChatMessageSchema = yup.object().shape({
  message: yup
    .string()
    .min(1, 'minimum 1 text character required')
    .max(32, 'maximum 20 text character allowed')
    .required('Please input text'),
})
