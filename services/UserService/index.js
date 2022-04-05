const axios = require("axios");
const {stringifyQuerystring} = require("../../util/queryUtil");
const {sortObject} = require("../ObjectService");
const apiUrl = (queryString) => `https://randomuser.me/api/?&${queryString ? queryString : ''}`;

async function getUsers(query) {
    let response;

    try {
        const paramsArray = Object.keys(query)
            .map(key => [key, query[key]]);
        const paramsStr = stringifyQuerystring(paramsArray)
        const {data} = await axios.get(apiUrl(paramsStr));
        response = data.results;

        if (query.sort) {
            let sort = query.sort;

            if (typeof sort !== 'object') {
                try {
                    sort = JSON.parse(sort);
                } catch (e) {
                    console.error('Error parsing sort into object');
                }
            }
            const comparator = (a, b) => a[sort.key].localeCompare(b[sort.key]);

            response = [sortObject(response, comparator, sort)];
        }

        return response;
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