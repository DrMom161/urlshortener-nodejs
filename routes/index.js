var express = require('express');
var router = express.Router();

/**
 * Redirect page
 */
router.get('/*', function (req, res) {
    var redirectingModel = require('../models/redirecting');
     var shortUrl = req.params[0];
    //get mongo document and exec callback
    redirectingModel.getByShortUrl(shortUrl, function (redirectingObject) {
        var redirecting = require('../utils/redirecting');
        var longUrl = redirectingObject ? redirectingObject.longUrl : null;
        redirecting.redirectTo(res, longUrl);
    });
});

/**
 * Creating new redirecting pair
 */
router.post('/create_short_url', function (req, res) {
    var validator = require('../utils/validator');
    var redirecting = require('../utils/redirecting');
    var redirectingObject = {
        shortUrl: req.body.shortUrl,
        longUrl: req.body.longUrl
    }
    validator.validateRedirectingObject(redirectingObject, function (result, redirectingObject) {
        if (result.hasError === false) {
            var redirectingModel = require('../models/redirecting');
            redirectingModel.save(redirectingObject, function (redirectingObject) {
                result.hasError = false;
                result.data = {shortUrl: req.protocol + '://' + req.get('host') + '/' +redirectingObject.shortUrl};
                redirecting.printJson(res, result);
            });

        } else {
            redirecting.printJson(res, result);
        }
    });

});

module.exports = router;
