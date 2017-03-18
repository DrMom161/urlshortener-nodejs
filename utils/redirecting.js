var redirecting = {};
var frontSiteUrl = 'https://pipy-vol.000webhostapp.com';
/**
 * Redirect to url or show 404
 * @param res - response object
 * @param url - url for redirecting
 */
redirecting.redirectTo = function (res, url) {
    if (url) {
        res.redirect(301, url);
    } else {
        redirecting.showMainPage(res);
    }
};

/**
 * Show main page (front part) if short url does not exist
 * @param res - response object
 */
redirecting.showMainPage = function (res) {
    res.redirect(frontSiteUrl);
};

/**
 * Print json data as result
 * @param res - response object
 * @param data
 */
redirecting.printJson = function (res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
};

module.exports = redirecting;