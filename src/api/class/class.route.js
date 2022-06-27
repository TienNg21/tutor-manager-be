const express = require('express');
const router = express.Router({ mergeParams: true });

const classController = require('./class.controller');

router.route('/').post(classController.createClass)
    .get(classController.getClasses)

router.route('/:classId').get(classController.getClassById).put(classController.updateClass)
    .delete(classController.deleteClass);

module.exports = router;
