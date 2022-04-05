const logger = require("../../services/Logger");

function getDbQueryStrings(queryString = {}) {
    let query = queryString.query || {};
    let searchStr = queryString.searchstr || null;
    const sort = queryString.sort || null;
    const skip = Number(queryString.skip) || 0;
    const limit = Number(queryString.limit) || 100;

    if (searchStr) {
        searchStr = searchStr.toLowerCase();
    }

    if (query && typeof query === "string") {
        try {
            query = JSON.parse(query);
        } catch (e) {
            logger.error({error: e, query});
            throw new Error(e);
        }
    }

    return {query, searchStr, skip, limit, sort};
}

module.exports = {getDbQueryStrings};
