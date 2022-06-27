const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('./auth.controller')

router.route('/register').post(
    authController.register
);

router.route('/login').post(authController.login);

router.route('/confirm/:confirmToken').post(authController.confirm);

router.route('/change-email').put(authController.changeEmail);

router.route('/forgot-password').post(authController.forgotPassword);

router.route('/reset-password').post(authController.resetPassword)

module.exports = router;