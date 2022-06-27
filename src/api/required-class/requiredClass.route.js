const express = require('express');
const router = express.Router({ mergeParams: true });

const requiredClassesController = require('./requiredClass.controller');

router.route('/').post(requiredClassesController.createRequiredClass)
    .get(requiredClassesController.getRequiredClasses)

router.route('/:requiredClassId').get(requiredClassesController.getRequiredClassById).put(requiredClassesController.updateRequiredClass)
    .delete(requiredClassesController.deleteRequiredClass);

module.exports = router;
