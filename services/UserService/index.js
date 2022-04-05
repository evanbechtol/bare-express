const axios = require("axios");
const apiUrl = (queryString) => `https://randomuser.me/api/?&${queryString ? queryString : ''}`;

async function getUsers(query) {
    let response;

    try {
        let paramsArray = Object.keys(query)
            .map(key => [key, query[key]]);
        const paramsStr = paramsArray.reduce((previousValue, currentValue, currentIndex) => {
            let key = currentValue[0];
            let value = currentValue[1];

            switch (key) {
                case 'limit':
                    key = 'results';
                    break;
            }

            previousValue += `${key}=${value}`;

            if (currentIndex < paramsArray.length - 1) {
                previousValue += "&";
            }
            return previousValue;
        }, "");
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