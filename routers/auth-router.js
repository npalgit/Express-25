const express = require('express');
const passport = require('passport');

module.exports = function(app, data, models, validator) {
    const controller =
        require('../controllers/auth-controller')(data, models, validator);

    const router = new express.Router();

    router
        .get('/login', controller.loadLoginPage)
        .get('/register', controller.loadRegisterPage)
        .post('/login',
            passport
            .authenticate('local', { failureRedirect: '/login' }),
            (req, res) => res.redirect('/'))
        .post('/register', controller.register)
        .get('/logout', controller.logout)
        .get('/profile', controller.getProfile)
        .get('/unauthorized', controller.unauthorized);

    app.use('/', router);
};