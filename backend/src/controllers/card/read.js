const Board = require("../../models/board.js");

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyField(req, res, "boardID");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongField(req, res, "boardID", req.body.boardID);
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyField(req, res, "cardType");
        return;
    }
    if (!Request.typeExists(req.body.cardType)) {
        ErrorHandler.wrongField(req, res, "cardType", req.body.cardType);
    }
    if (!Request.haveID(req.body.cardID)) {
        ErrorHandler.emptyField(req, res, "cardID");
        return;
    }
    try {
        let board = await Board.findById(boardID)
        let card = board[req.body.cardType + "Cards"].id(req.body.cardID);
        if (card === null) {
            throw ({
                status: "wrong card"
            })
        }
        res.json(card);
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = read;