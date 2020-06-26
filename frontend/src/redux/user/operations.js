import {
   getUserLoading,
   getUserSuccess,
   getUserError,
   updateUserLoading,
   updateUserSuccess,
   updateUserError,
   userAvatarLoading,
   userAvatarError,
   searchContactLoading,
   searchContactSuccess,
   searchContactError,
   updateContactsSuccess,
   updateContactsError,
   getInvitedEmailSuccess,
} from './actions'
import { fetchRequest } from '../fetch/operations'

const MAIN_URL = '/user'
const AVATAR_URL = MAIN_URL + '/avatar'
const CONTACT_URL = MAIN_URL + '/contact'

export const getUserInfo = () =>
   fetchRequest.get(MAIN_URL, [getUserLoading, getUserSuccess, getUserError])

export const updateUserInfo = (updateFields) =>
   fetchRequest.put(
      MAIN_URL,
      [updateUserLoading, updateUserSuccess, updateUserError],
      updateFields
   )

export const uploadAvatar = (file) =>
   fetchRequest.uploadFile(
      AVATAR_URL,
      [userAvatarLoading, updateUserSuccess, userAvatarError],
      file
   )

export const deleteAvatar = () =>
   fetchRequest.delete(
      AVATAR_URL,
      [userAvatarLoading, updateUserSuccess, userAvatarError],
      {}
   )

export const searchContact = (email) =>
   fetchRequest.post(
      CONTACT_URL + '/search',
      [searchContactLoading, searchContactSuccess, searchContactError],
      email
   )

export const addContact = (contactId) =>
   fetchRequest.post(
      CONTACT_URL,
      [null, updateContactsSuccess, updateContactsError],
      contactId
   )

export const deleteContact = (contactId) =>
   fetchRequest.delete(
      CONTACT_URL,
      [null, updateContactsSuccess, updateContactsError],
      contactId
   )

export const getInvitedEmail = (linkId) =>
   fetchRequest.get('/signup/' + linkId, [
      getUserLoading,
      getInvitedEmailSuccess,
      getUserError,
   ])
