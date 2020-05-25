import { fetchRequest } from '../fetch/operations'

import {
   getBudgetSuccess,
   getTravelSuccess,
   changeTravelSuccess,
   createTravelSuccess,
} from './actions'

const MAIN_URL = '/travel/'

export const getBudget = (travelId) =>
   fetchRequest.get('/card/payer/summary/' + travelId, getBudgetSuccess)

export const getTravel = (travelId) =>
   fetchRequest.get(MAIN_URL + travelId, getTravelSuccess)

export const changeTravel = (title) =>
   // fetchRequest('PUT', '/travel/', changeTravelSuccess, JSON.stringify(title))
   fetchRequest.put(MAIN_URL, changeTravelSuccess, title)

export const createTravel = (travelData) =>
   fetchRequest.post(MAIN_URL, createTravelSuccess, travelData)
