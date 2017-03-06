var validator = {};
const SHORT_URL_MAX_LENGTH = 10;
/**
 * Validate redirecting object
 * @param redirectingObject
 * @param callback
 * @return object (
 *                      hasError boolean
 *                      errors array
 *                  )
 */
validator.validateRedirectingObject = function (redirectingObject, callback) {
    var result = {
            hasError: true,
            errors: []
        },
        isValidLongUrl = true;

    //check long url exists
    if (!redirectingObject.longUrl) {
        result.errors.push('"Long url" can not be empty.');
        isValidLongUrl = false;
    }
    //check long url exists in www
    if (!isValidUrl(redirectingObject.longUrl)) {
        result.errors.push('"Long url" must be valid url.');
        isValidLongUrl = false;
    }
    var redirectingModel = require('../models/redirecting');

    //check exists and validate short url
    var shortUrl = redirectingObject.shortUrl;
    if (shortUrl && isValidLongUrl) {
        //check length
        if (shortUrl.length <= SHORT_URL_MAX_LENGTH) {
            //check unique
            redirectingModel.checkExists(redirectingObject, result, callback);
        } else {
            result.errors.push('"Short url" length can not be more then 10 symbols.');
            callback(result);
        }
    }
    else if (!shortUrl && isValidLongUrl) {
        //if all ok but hasn't short  url - generate unique short url and save pair
        redirectingModel.generateUniqueShortUrl(redirectingObject, result, callback);
    } else {
        callback(result);
    }


};

/**
 * Check url http headers
 * @param url
 * @return boolean
 */
function isValidUrl(url) {
    var request = require('sync-request'),
        result = false;
    try {
        var res = request('GET', url);
        result = res.statusCode !== 404;
        console.log(res.statusCode);
    } catch (e) {
        console.log(e)
    }
    return result;
}

module.exports = validator;
