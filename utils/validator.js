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
    isValidUrl(redirectingObject.longUrl, function (isValid) {
        if (!isValid) {
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
    });


};

/**
 * Check url http headers
 * @param url
 * @param callback
 */
function isValidUrl(url, callback) {
    var request = require('request');
    try {
        request(url, function (error, response) {
            callback(response && response.statusCode !== 404);
        });
    } catch (e) {
        console.log(e);
    }

}

module.exports = validator;
