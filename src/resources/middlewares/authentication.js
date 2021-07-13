module.exports.authenticate = (req, res, next) => {
    const userId = req.signedCookies.userId;
    if(!userId) {
        res.redirect('/acc/login');
    }

    next();
}