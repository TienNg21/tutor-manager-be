const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require('./user.controller')

router.route('/profile').get(userController.getUserProfile)
    .put(userController.updateProfile);

router.route('/password').put(userController.changePassword);

module.exports = router;
