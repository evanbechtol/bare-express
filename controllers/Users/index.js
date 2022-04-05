const queryUtil = require("../../util/queryUtil");
const userService = require("../../services/UserService");
const {sendSuccess, sendError} = require("../../middlewares/response");
const logger = require("../../services/Logger");
const {responses} = require("../../config/messages");

async function getUsers(req, res) {
    const queryStrings = queryUtil.getDbQueryStrings(req.query);

    try {
        const data = await userService.getUsers(queryStrings);
        return res.send(sendSuccess(data));
    } catch (err) {
        logger.error(err);
        res.status(500).send(sendError(err.message));
    }
}

async function getUserById(req, res) {
    try {
        if (req.id) {
            const data = await userService.getUserById(req.id);
            return res.send(sendSuccess(data));
        } else {
            return res.send(sendError(responses.idNotProvided))
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send(sendError(err.message));
    }
}

module.exports = {
    getUsers,
    getUserById
}