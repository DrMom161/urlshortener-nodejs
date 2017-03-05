var MongoClient = require('mongodb');

// Connection URL
var url = 'mongodb://localhost:27017/urlshortener';
/**
 * Fetch redirecting object by shortUrl
 * @param shortUrl
 * @param callback
 * @return object
 */
redirecting.getByShortUrl = function (shortUrl, callback) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('redirecting');
        collection.findOne({shortUrl: shortUrl}, function (err, redirectingObject) {
            callback(redirectingObject);
        });
    });
};

/**
 * Save new redirecting pair
 * @param redirectingObject
 * @param callback
 */
redirecting.save = function (redirectingObject, callback) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('redirecting');
        collection.insertOne(redirectingObject);
        callback(redirectingObject);
    });
};

/**
 * Check short url exist
 * @param redirectingObject
 * @param result
 * @param callback
 */
redirecting.checkExists = function (redirectingObject, result, callback) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('redirecting');

        collection.findOne({shortUrl: redirectingObject.shortUrl}, function (err, savedRedirectingObject) {
            //if exists - add error
            if (savedRedirectingObject) {
                var xssFilters = require('xss-filters');
                result.errors.push('Short url "' + xssFilters.inHTMLData(redirectingObject.shortUrl) + '" already exists.')
            } else {
                result.hasError = false;
            }
            callback(result, redirectingObject);
        });

    });
};
/**
 * Generate unique short url
 * @param redirectingObject
 * @param result
 * @param callback
 */
redirecting.generateUniqueShortUrl = function (redirectingObject, result, callback) {
    redirectingObject.shortUrl = generateShortUrl();
    redirecting.checkExists(redirectingObject, result, function (result, redirectingObject) {
        //if generated not unique short url - make recursion
        if (result.hasError) {
            redirecting.generateUniqueShortUrl(redirectingObject, result, callback);
        } else {
            callback(result, redirectingObject);
        }
    });
};

/**
 * Generate short url
 * @return string
 */
function generateShortUrl() {
    var characters = 'abcdefghijklmnopqrstuvwxyz',
        charactersMaxIndex = characters.length - 1,
        //urlLength between 8 and 10
        urlLength = Math.floor(Math.random() * (10 - 8 + 1) + 10),
        url = '';

    for (var i = 0; i < urlLength; i++) {
        number = Math.floor(Math.random() * (charactersMaxIndex + 1));
        char = characters[Math.floor(Math.random() * (charactersMaxIndex + 1))];
        console.log(charactersMaxIndex, number, char);
        url += char;
    }
    console.log(url);
    return url;
}

module.exports = redirecting;