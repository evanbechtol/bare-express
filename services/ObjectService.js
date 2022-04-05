/**
 * @description Remove keys which are not present on the whitelist, and
 *   return the object with only the whitelisted keys
 * @param obj {object} Object to filter using the whitelist
 * @param keys {array} List of whitelisted keys
 * @returns {object} Return object with only the whitelisted keys
 */
function pick(obj, keys) {
    return keys
        .map(k => k in obj ? {[k]: obj[k]} : {})
        .reduce((res, o) => Object.assign(res, o), {});
}

function sortObject(data, comparator, sort) {
    let sortedData = [...data].sort(comparator);

    if (sort.direction !== "asc") {
        sortedData = sortedData.reverse();
    }

    return sortedData;
}
module.exports = {pick, sortObject};
