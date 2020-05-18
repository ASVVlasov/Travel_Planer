import {
   GET_HEADER_LOADING,
   GET_HEADER_SUCCESS,
   CHANGE_TRAVEL_DATE_SUCCESS,
   CHANGE_TRAVEL_TITLE_SUCCESS,
} from '../types'

const initialState = {
   title: '',
   beginDate: null,
   endDate: null,
}

export default function headerReducer(state = initialState, action) {
   switch (action.type) {
      case GET_HEADER_LOADING: {
         return {
            ...state,
         }
      }

      case GET_HEADER_SUCCESS: {
         return {
            ...state,
            travelId: action.payload._id,
            title: action.payload.title,
            beginDate: action.payload.beginDate,
            endDate: action.payload.endDate,
         }
      }

      case CHANGE_TRAVEL_DATE_SUCCESS: {
         return {
            ...state,
            beginDate: action.payload.beginDate,
            endDate: action.payload.endDate,
         }
      }

      case CHANGE_TRAVEL_TITLE_SUCCESS: {
         return {
            ...state,
            title: action.payload.title,
         }
      }

      default:
         return state
   }
}
