const express = require('express');
const router = express.Router({ mergeParams: true });

const addressController = require('./address.controller');

router.route('/province').get(addressController.getProvinceList);

router.route('/district/:provinceId').get(addressController.getDistrictByProvince);

router.route('/ward/:districtId').get(addressController.getWardByDistrict);

module.exports = router;