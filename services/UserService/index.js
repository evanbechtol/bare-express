const axios = require("axios");
const {stringifyQuerystring} = require("../../util/queryUtil");
const apiUrl = (queryString) => `https://randomuser.me/api/?&${queryString ? queryString : ''}`;

async function getUsers(query) {
    let response;

    try {
        const paramsArray = Object.keys(query)
            .map(key => [key, query[key]]);
        const paramsStr = stringifyQuerystring(paramsArray)
        const {data} = await axios.get(apiUrl(paramsStr));
        response = data.results;
    } catch (err) {
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