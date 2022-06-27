const authService = require('./auth.service');
const Joi = require('@hapi/joi');
const { transformErrorResponse } = require('../../helper');
const { HttpStatus } = require('../../const');

const register = (request) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
        address: Joi.string().required(),
        province: Joi.number().required(),
        district: Joi.number().required(),
        ward: Joi.number().required(),
        citizenId: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        gender: Joi.boolean().required(),
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin đăng ký không hợp lệ", "auth");

    }

    return authService.register(request);
}


const login = (request) => {

    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Email hoặc mật khẩu không hợp lệ", "auth");
    }

    return authService.login(request);
}

const confirm = (request) => {

    const schema = Joi.object({
        confirmToken: Joi.string().required()
    })
    const { error } = schema.validate(request.params);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Xác thực không thành công", "auth");
    }

    return authService.confirm(request);

}


const changeEmail = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required(),
        password: Joi.string().min(6).required(),
        newEmail: Joi.string().required()
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật không hợp lệ", "auth");

    }

    return authService.changeEmail(request);
}

const forgotPassword = (request) => {
    const schema = Joi.object({
        email: Joi.string().required()
    })

    const { error } = schema.validate(request.body);

    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Email không hợp lệ", "auth");

    }

    return authService.forgotPassword(request);
}

const resetPassword = (request) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().required().min(6)
    })

    const { error } = schema.validate(request.body);

    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Mã xác thực hoặc mật khẩu mới không hợp lệ", "auth");

    }

    return authService.resetPassword(request);
}

module.exports = {
    register,
    login,
    confirm,
    changeEmail,
    forgotPassword,
    resetPassword
}