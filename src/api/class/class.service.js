const { HttpStatus, DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } = require("../../const");
const { transformErrorResponse, transformSuccessResponse } = require('../../helper');
const Ward = require("../../../database/models/Ward");
const Class = require("../../../database/models/Class");
const User = require("../../../database/models/User");
const { Op } = require("sequelize");
const RequiredClass = require("../../../database/models/RequiredClass");

const createClass = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                id: request.body.authId,
                confirmed: 1,
                deleted: 0,
            }
        });

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tài khoản không tồn tại', 'user');
        }

        const requiredClass = await RequiredClass.findOne({
            where: {
                id: request.body.requiredClassId,
            }
        });
        if (!requiredClass) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Yêu cầu lớp học không tồn tại', 'required-class');
        }

        const body = requiredClass.dataValues;

        if (body.minSalary >= request.body.salary || body.maxSalary <= request.body.salary) {

            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mức lương không hợp lệ', 'required-class');
        }
        body.salary = request.body.salary;
        body.studentId = request.body.studentId;
        delete body.minSalary;
        delete body.maxSalary;
        delete body.createdAt;
        delete body.updatedAt;
        delete body.id;

        const isCreateClassSuccess = await Class.create({
            ...body
        })

        if (!isCreateClassSuccess._options.isNewRecord) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo lớp học không thành công', 'classes');

        }

        let data = body;

        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo lớp học không thành công', 'classes');

    }
}

const getClasses = async (request) => {
    try {
        const pagination = request?.query?.pagination;
        let query = {
            deleted: 0,
            userId: request.body.authId,
        }

        const address = request?.query?.address;

        if (address) {
            if (address?.province) {
                query = {
                    ...query,
                    province: address.province,
                }
            }
            if (address?.district) {
                query = {
                    ...query,
                    district: address.district,
                }
            }
            if (address?.ward) {
                query = {
                    ...query,
                    ward: address.ward,
                }
            }
        }

        const classes = await Class.findAndCountAll({
            limit: Number(pagination?.limit) || DEFAULT_PAGINATION_LIMIT,
            offset: Number(pagination?.page * pagination?.limit) || DEFAULT_PAGINATION_PAGE,
            where: query,
        });

        if (!classes) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách lớp học', 'classes');
        }

        return transformSuccessResponse(classes.rows, classes.count);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Lấy danh sách lớp học không thành công', 'classes');

    }
}

const getClassById = async (request) => {
    try {

        const classes = await Class.findAndCountAll({
            where: {
                id: request.params.ClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });

        if (!classes) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');
        }

        return transformSuccessResponse(classes.rows, classes.count);
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');
    }
}

const updateClass = async (request) => {
    try {
        const classes = await Class.findOne({
            where: {
                id: request.params.ClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });
        if (!classes) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');

        }

        const isAddressExist = await Ward.findOne({
            where: {
                id: request.body.ward,
                districtId: request.body.district,
                provinceId: request.body.province,
            }
        })

        if (!isAddressExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Địa chỉ không tồn tại', 'address');
        }

        const body = request.body;

        const updateClass = await Class.update({
            ...body
        }, {
            where: {
                userId: request.body.authId,
                id: request.params.ClassId,
                deleted: 0,
            }
        })

        if (!updateClass) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');

        }

        const data = request.body;
        delete data.authId;
        data.id = request.params.ClassId;
        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật lớp học không thành công', 'classes');

    }
}

const deleteClass = async (request) => {
    try {

        const classes = await Class.findOne({
            where: {
                id: request.params.ClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });

        if (!classes) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');

        }

        const updateClass = await Class.update({
            deleted: 1,
        }, {
            where: {
                userId: request.body.authId,
                id: request.params.ClassId,
                deleted: 0,
            }
        })

        if (!updateClass) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy lớp học phù hợp', 'classes');

        }
        classes.deleted = true;
        return transformSuccessResponse(classes);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật lớp học không thành công', 'classes');

    }
}

module.exports = {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass
}