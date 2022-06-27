const addressService = require('./address.service');
const Joi = require('@hapi/joi');
const { transformErrorResponse } = require('../../helper');
const { HttpStatus } = require('../../const');

const getProvinceList = async (request) => {
    const data = await addressService.getProvinceList(request);
    return data;
}

const getDistrictByProvince = async (request) => {
    const schema = Joi.object({
        provinceId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.params);

    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Địa chỉ không hợp lệ', "address")
    }
    const data = await addressService.getDistrictByProvince(request);
    return data;
}

const getWardByDistrict = async (request) => {
    const schema = Joi.object({
        districtId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.params);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Địa chỉ không hợp lệ', "address")
    }
    const data = await addressService.getWardByDistrict(request);
    return data;
}

module.exports = {
    getProvinceList,
    getDistrictByProvince,
    getWardByDistrict
}