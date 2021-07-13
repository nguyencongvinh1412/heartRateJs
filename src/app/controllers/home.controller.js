module.exports.home = (req, res, next) => {
    res.render('home', {
        layout: 'home.hbs',
    });
}

module.exports.contact = (req, res, next) => {
    res.render('contact', {
        layout: 'home.hbs',
    });
}