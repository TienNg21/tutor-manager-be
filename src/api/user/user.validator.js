const userService = require('./user.service');
const Joi = require('@hapi/joi');
const { transformErrorResponse } = require('../../helper');
const { HttpStatus } = require('../../const');

const getUserProfile = async (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mã số gia sư không hợp lệ', "required-classes")
    }
    const data = await userService.getUserProfile(request);
    return data;
}

const updateProfile = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required(),
        name: Joi.string(),
        address: Joi.string(),
        citizenId: Joi.string(),
        phoneNumber: Joi.string(),
        description: Joi.string().optional(),
        rating: Joi.number(),
        openToWork: Joi.boolean(),
        gender: Joi.boolean(),
        ward: Joi.number(),
        district: Joi.number(),
        province: Joi.number(),
    })

    const { error } = schema.validate(request.body);

    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật không hợp lệ", "user");

    }

    return userService.updateProfile(request);
}

const changePassword = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required(),
        password: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật không hợp lệ", "user");

    }

    return userService.changePassword(request);
}

module.exports = {
    getUserProfile,
    updateProfile,
    changePassword,
}