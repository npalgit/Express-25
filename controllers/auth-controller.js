module.exports = function(data, models, validator) {
    return {
        loadRegisterPage(req, res) {
            return res.status(200).render('auth/register-view', { result: {} });
        },
        loadLoginPage(req, res) {
            return res.status(200).render('auth/login-view', { result: {} });
        },
        register(req, res) {
            validator.validatePasswordsMatch(req.body.password,
                req.body.passConfirmation);

            const user = models
                .getUser(req.body.username,
                    req.body.password,
                    req.body.firstName,
                    req.body.lastName);

            data.addUser(user)
                .then((userId) => {
                    if (req.body.optradio === 'doctorType') {
                        const doctor = models.getDoctor(userId,
                            req.body.regNumber,
                            req.body.speciality,
                            req.body.medCenter,
                            req.body.city,
                            false);

                        data.addDoctor(doctor);
                    } else if (req.body.optradio === 'patientType') {
                        const patient = models.getPatient(userId, req.body.pin);

                        data.addPatient(patient);
                    }
                });

            res.redirect('/login');
        },
        logout(req, res) {
            req.logout();
            res.status(200).redirect('/');
        },
        getProfile(req, res) {
            const result = {};
            result.title = 'Профил';

            if (req.isAuthenticated()) {
                result.user = req.user.username;
            }

            res.render('auth/profile-view', { result });
        },
        unauthorized(req, res) {
            res.render('unauthorized-view', {
                result: {
                    title: 'ГРЕШКА!',
                },
            });
        },
    };
};