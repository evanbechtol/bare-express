const axios = require("axios");
const {sendError, sendSuccess} = require("../../middlewares/response");
const apiUrl = "https://randomuser.me/api/";

async function getUsers(params) {
    let response;

    try {
        const {data} = await axios.get(apiUrl);
        response = data.results;
    } catch(err) {
        console.error(err);
        throw err;
    }

    return response;
}

function getUserById() {

}

module.exports = {
    getUsers,
    getUserById
}