const { HttpStatus, DEFAULT_ORDER_BY, DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } = require("../../const");
const { transformErrorResponse, transformSuccessResponse } = require('../../helper');
const Ward = require("../../../database/models/Ward");
const RequiredClass = require("../../../database/models/RequiredClass");
const User = require("../../../database/models/User");
const { Op } = require("sequelize");

const createRequiredClass = async (request) => {
    try {
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

        if (request.body.minSalary > request.body.maxSalary) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mức lương yêu cầu không hợp lệ', 'required-classes');
        }

        const body = request.body;
        body.code = "code";
        body.userId = request.body.authId;
        const isCreateRequiredClassSuccess = await RequiredClass.create({
            ...body
        })

        if (!isCreateRequiredClassSuccess._options.isNewRecord) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo yêu cầu lớp học không thành công', 'required-classes');

        }

        let data = request.body;

        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo yêu cầu lớp học không thành công', 'required-classes');

    }
}

const getRequiredClasses = async (request) => {
    try {
        const pagination = request?.query?.pagination;

        const private = request?.query?.private;

        let query = {
            deleted: 0,
        }
        if (private) {
            query = {
                ...query,
                userId: request.body.authId,
            }
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

        const salary = request?.query?.salary;

        if (salary) {
            query = {
                ...query,
                minSalary: {
                    [Op.lte]: salary
                },
                maxSalary: {
                    [Op.gte]: salary
                }
            }
        }



        const requiredClasses = await RequiredClass.findAndCountAll({
            limit: Number(pagination?.limit) || DEFAULT_PAGINATION_LIMIT,
            offset: Number(pagination?.page * pagination?.limit) || DEFAULT_PAGINATION_PAGE,
            where: query,
        });

        if (!requiredClasses) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách yêu cầu lớp học', 'required-classes');
        }

        return transformSuccessResponse(requiredClasses.rows, requiredClasses.count);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Lấy danh sách yêu cầu lớp học không thành công', 'required-classes');

    }
}

const getRequiredClassById = async (request) => {
    try {

        const requiredClasses = await RequiredClass.findAndCountAll({
            where: {
                id: request.params.requiredClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });

        if (!requiredClasses) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');
        }

        return transformSuccessResponse(requiredClasses.rows, requiredClasses.count);
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');
    }
}

const updateRequiredClass = async (request) => {
    try {
        const requiredClasses = await RequiredClass.findOne({
            where: {
                id: request.params.requiredClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });
        if (!requiredClasses) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');

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

        const updateRequiredClass = await RequiredClass.update({
            ...body
        }, {
            where: {
                userId: request.body.authId,
                id: request.params.requiredClassId,
                deleted: 0,
            }
        })

        if (!updateRequiredClass) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');

        }

        const data = request.body;
        delete data.authId;
        data.id = request.params.requiredClassId;
        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật yêu cầu lớp học không thành công', 'required-classes');

    }
}

const deleteRequiredClass = async (request) => {
    try {

        const requiredClasses = await RequiredClass.findOne({
            where: {
                id: request.params.requiredClassId,
                userId: request.body.authId,
                deleted: 0,
            }
        });

        if (!requiredClasses) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');

        }

        const updateRequiredClass = await RequiredClass.update({
            deleted: 1,
        }, {
            where: {
                userId: request.body.authId,
                id: request.params.requiredClassId,
                deleted: 0,
            }
        })

        if (!updateRequiredClass) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thấy yêu cầu lớp học phù hợp', 'required-classes');

        }
        requiredClasses.deleted = true;
        return transformSuccessResponse(requiredClasses);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật yêu cầu lớp học không thành công', 'required-classes');

    }
}

module.exports = {
    createRequiredClass,
    getRequiredClasses,
    getRequiredClassById,
    updateRequiredClass,
    deleteRequiredClass
}