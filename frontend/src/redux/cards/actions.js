import {
   GET_CARDS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   FETCH_ERROR,
} from '../types'

export const getCards = (activeTabId) => ({
   type: GET_CARDS,
   payload: { activeTabId },
})

export const changeCardSuccess = (updCard) => ({
   type: CHANGE_CARD_SUCCESS,
   payload: { updCard },
})

export const deleteCardSuccess = (cardId) => ({
   type: DELETE_CARD_SUCCESS,
   payload: { cardId },
})

export const hadError = (err) => ({
   type: FETCH_ERROR,
   payload: { err },
})
