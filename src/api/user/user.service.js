const { transformErrorResponse, transformSuccessResponse } = require('../../helper');
const bcrypt = require('bcryptjs')
const { HttpStatus } = require("../../const");
const User = require('../../../database/models/User');

const getUserProfile = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                id: request.body.authId,
                deleted: 0
            }
        })

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tài khoản không tồn tại', 'user');
        }

        data = isUserExist.dataValues;
        delete data.password;
        delete data.deleted;
        delete data.confirmed;
        delete data.blocked;
        delete data.newEmail;
        delete data.resetPasswordToken;
        return transformSuccessResponse(data);

    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Lấy thông tin tài khoản không thành công', 'user');
    }

}

const updateProfile = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                id: request.body.authId,
                deleted: 0
            }
        })

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tài khoản không tồn tại', 'user');
        }

        const body = request.body;

        const isUpdateSuccess = await User.update({
            ...body
        }, {
            where: {
                id: request.body.authId,
                deleted: 0
            }
        });

        if (!isUpdateSuccess) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật tài khoản không thành công', 'user');
        }

        const newUser = await User.findOne({
            where: {
                id: request.body.authId,
                deleted: 0
            }
        })

        const data = newUser.dataValues;
        delete data.password;
        delete data.deleted;
        delete data.confirmed;
        delete data.blocked;
        delete data.newEmail;
        delete data.resetPasswordToken;
        return transformSuccessResponse(data);
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Cập nhật thông tin tài khoản không thành công', 'user');

    }
}

const changePassword = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                id: request.body.authId,
                deleted: 0
            }
        })

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tài khoản không tồn tại', 'user');
        }

        const validPassword = bcrypt.compareSync(request.body.password, isUserExist.dataValues.password);
        if (!validPassword) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mật khẩu không đúng', 'user');
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(request.body.newPassword, salt);

        const isChangePasswordSuccess = await User.update({
            password: hashedPassword,
        }, {
            where: {
                id: request.body.authId,
                deleted: 0
            }
        })
        if (!isChangePasswordSuccess) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Thay đổi mật khẩu không thành công', 'user');
        }

        const data = isUserExist.dataValues;
        delete data.password;
        delete data.deleted;
        delete data.confirmed;
        delete data.blocked;
        delete data.newEmail;
        delete data.resetPasswordToken;
        return transformSuccessResponse(data);

    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Thay đổi mật khẩu không thành công', 'user');

    }
}

module.exports = {
    getUserProfile,
    updateProfile,
    changePassword
}