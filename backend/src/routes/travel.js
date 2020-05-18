const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const CardModel = require('../models/card')
const TravelModel = require('../models/travel')
const FileModel = require('../models/file')
const travelId = '5eb9a8ae468c2a28eb4220f0'

router.get(
   '/:travelId',
   asyncHandler(async (req, res) => {
      res.json(await TravelModel.findOne({ _id: travelId }))
   })
)
router.post(
   '/',
   asyncHandler(async (req, res) => {
      res.json(await TravelModel.create(req.body))
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const { travelModel } = req.body
      delete travelModel.cards
      delete travelModel.users
      res.json(await TravelModel.findOneAndUpdate(travelModel._id, travelModel, { new: true }))
   })
)

// TODO remove child files of cards
router.delete(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const travel = await TravelModel.findByIdAndDelete(travelId)
      const cards = await CardModel.deleteMany({ travelId })
      // for (const card of cards) {
      //    for (const file of card.files) {
      //       await FileModel.remove({ _id: file.id })
      //    }
      // }
      res.json({ travel, cards })
   })
)

module.exports = router
