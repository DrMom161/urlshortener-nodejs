var redirecting = {};

/**
 * Redirect to url or show 404
 * @param res - response object
 * @param url - url for redirecting
 */
redirecting.redirectTo = function (res, url) {
    if (url) {
        res.redirect(301, url);
    } else {
        redirecting.show404(res, 'Short url does not exist');
    }
};

/**
 * Show 404 with message
 * @param res - response object
 * @param message
 */
redirecting.show404 = function (res, message) {
    res.status(404);
    res.render('404', { message: message });
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