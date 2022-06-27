const requiredClassesService = require('./requiredClass.service');
const Joi = require('@hapi/joi');
const { transformErrorResponse } = require('../../helper');
const { HttpStatus } = require('../../const');

const createRequiredClass = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive(),
        grade: Joi.number().required().min(0).max(13),
        subject: Joi.string().required(),
        minSalary: Joi.number().required().min(0),
        maxSalary: Joi.number().required().min(0),
        province: Joi.number().required(),
        district: Joi.number().required(),
        ward: Joi.number().required(),
    })

    const { error } = schema.validate(request.body);
    if (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin tạo yêu cầu lớp học không hợp lệ", "required-classes");

    }

    return requiredClassesService.createRequiredClass(request);
}

const getRequiredClasses = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.body);

    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mã số gia sư không hợp lệ', "required-classes")
    }

    return requiredClassesService.getRequiredClasses(request);
}

const getRequiredClassById = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive(),
        requiredClassId: Joi.number().required().positive()
    })
    const data = {
        authId: request.body.authId,
        requiredClassId: request.params.requiredClassId,
    }
    const { error } = schema.validate(data);
    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mã số yêu cầu không hợp lệ', 'required-classes');
    }

    return requiredClassesService.getRequiredClassById(request);
}

const updateRequiredClass = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive(),
        grade: Joi.number().min(0).max(13),
        subject: Joi.string(),
        minSalary: Joi.number().min(0),
        maxSalary: Joi.number().min(0),
        province: Joi.number(),
        district: Joi.number(),
        ward: Joi.number(),
    })

    const paramSchema = Joi.object({
        requiredClassId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.body);
    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật yêu cầu lớp học không hợp lệ", "required-classes");

    }

    const { paramError } = paramSchema.validate(request.params);
    if (paramError) {
        console.log(paramError);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật yêu cầu lớp học không hợp lệ", "required-classes");

    }

    return requiredClassesService.updateRequiredClass(request);
}

const deleteRequiredClass = (request) => {
    const schema = Joi.object({
        authId: Joi.number().required().positive(),
    })

    const paramSchema = Joi.object({
        requiredClassId: Joi.number().required().positive()
    })

    const { error } = schema.validate(request.body);
    if (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin xóa yêu cầu lớp học không hợp lệ", "required-classes");

    }

    const { paramError } = paramSchema.validate(request.params);
    if (paramError) {
        console.log(paramError);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, "Thông tin cập nhật yêu cầu lớp học không hợp lệ", "required-classes");

    }

    return requiredClassesService.deleteRequiredClass(request);
}

module.exports = {
    createRequiredClass,
    getRequiredClasses,
    getRequiredClassById,
    updateRequiredClass,
    deleteRequiredClass
}
