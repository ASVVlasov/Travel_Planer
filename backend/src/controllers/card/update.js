const Board = require("../../models/board.js");

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const update = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyID(req, res, "board");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "board");
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyID(req, res, req.body.cardType);
        return;
    }
    if (!Request.typeExists(req.body.cardType)) {
        ErrorHandler.wrongType(req, res, req.body.cardType)
    }
    if (!Request.haveID(req.body.cardID)) {
        ErrorHandler.emptyID(req, res, "card");
        return;
    }
    try {
        let board = await Board.findById(boardID)
        let deck = board[req.body.cardType + "Cards"];
        let card = deck.id(req.body.cardID);
        if (card === null) throw (err)
        for (let updatedField in req.body.card) {
            card.updatedField = req.body.card[updatedField]
        }
        await board.save()
        updatedCard = deck.id(id);
        res.json(updatedCard)
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = update;