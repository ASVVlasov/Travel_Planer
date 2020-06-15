const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const errorHandler = require('./handlers/errorHandler')
const statusHandler = require('./handlers/statusHandler')
const populateHandler = require('./handlers/populateHandler')
const createError = require('http-errors')
const CardModel = require('./card')

const travelSchema = new Schema({
   title: {
      type: String,
      required: true,
      description: 'Название доски путешествия',
   },
   beginDate: {
      type: Date,
      description: 'Начало путешествия',
   },
   endDate: {
      type: Date,
      description: 'Конец путешествия',
   },
   status: {
      type: String,
      default: travelStatuses.ACTIVE,
      enum: travelStatusesValues,
      description: 'Статус поездки',
   },
   users: [
      {
         type: mongoose.ObjectId,
         description: 'ID участников путешествия',
         default: [],
         ref: 'User',
      },
   ],
   cards: [
      {
         type: mongoose.ObjectId,
         description: 'Карточки поездки',
         default: [],
         ref: 'Card',
      },
   ],
})

travelSchema.statics.pushUser = async function (travelId, userId) {
   const travel = await this.findById(travelId)
   if (travel.users.find((u) => u.id === userId) || !userId) {
      throw createError(
         400,
         'Такой участник здесь уже есть. Возможно кто-то добавил его до вас... или у нас двоится 👀 Обновите страницу, чтобы проверить.'
      )
   }
   const update = { $push: { users: userId } }
   return await this.findByIdAndUpdate(travelId, update, { new: true })
}

travelSchema.statics.updateTravel = async function (travelModel) {
   const updateBeginDate = new Date(travelModel.beginDate)
   const updateEndDate = new Date(travelModel.endDate)
   if (updateBeginDate > updateEndDate) {
      throw createError(
         400,
         'Дата начала не может быть больше даты окончания – жаль, но машину времени мы пока не разработали 🤖'
      )
   } else {
      for (const cardModel of travelModel.cards) {
         const card = await CardModel.findById(cardModel._id)
         if (
            (card.beginDate && new Date(card.beginDate) < updateBeginDate) ||
            (card.endDate && new Date(card.endDate) > updateEndDate)
         ) {
            throw createError(
               400,
               'Даты путешествия изменены успешно, рекомендуем проверить даты в карточках, чтобы точно ничего не перепутать 😥'
            )
         }
      }
   }
   return await this.findByIdAndUpdate(travelModel._id, travelModel, { new: true })
}

travelSchema.post('findOne', errorHandler.ErrorTravelHandler)
travelSchema.post('findOne', statusHandler)
travelSchema.post('findOne', populateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', errorHandler.ErrorTravelHandler)
travelSchema.post('findOneAndUpdate', statusHandler)
travelSchema.post('findOneAndUpdate', populateHandler.travelToClient)
travelSchema.post('save', statusHandler)
travelSchema.post('save', errorHandler.ErrorTravelHandler)
travelSchema.post('save', populateHandler.travelToClient)

module.exports = mongoose.model('Travel', travelSchema)
