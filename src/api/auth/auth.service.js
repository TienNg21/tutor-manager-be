const { sendEmail, transformErrorResponse, transformSuccessResponse, hashString, checkHashedString } = require("../../helper");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { HttpStatus } = require("../../const");
const User = require("../../../database/models/User");
const Ward = require("../../../database/models/Ward");

const register = async (request) => {
    try {

        const isUserExist = await User.findOne({
            where: {
                email: request.body.email,
                deleted: false,
            }
        });

        if (isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Email đã tồn tại trong hệ thống', 'auth');
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

        const hashedPassword = hashString(request.body.password);

        const confirmToken = uuidv4();

        const body = request.body;
        body.password = hashedPassword;
        body.confirmToken = confirmToken;
        const isInsertUserSuccess = await User.create({
            ...body
        })
        if (!isInsertUserSuccess._options.isNewRecord) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo tài khoản không thành công', 'auth');
        }

        const message = `${process.env.FE_BASE_URL}/confirm/${confirmToken}`
        const isSendEmailSuccess = await sendEmail(request.body.email, 'Click to verify your email', message);
        if (!isSendEmailSuccess) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Gửi email xác thực không thành công', 'auth');
        }
        let data = isInsertUserSuccess.dataValues;
        delete data.password;
        delete data.confirmed;
        delete data.blocked;
        delete data.newEmail;
        delete data.confirmToken;
        delete data.deleted;
        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tạo tài khoản không thành công', 'auth');
    }
}

const login = async (request) => {
    try {

        const isUserExist = await User.findOne({
            where: {
                email: request.body.email,
                deleted: false,
            }
        });

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Email không tồn tại trong hệ thống', 'auth');
        }

        if (!checkHashedString(request.body.password, isUserExist.dataValues.password)) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mật khẩu không đúng', 'auth');
        }

        if (!isUserExist.dataValues.confirmed) {
            if (isUserExist.dataValues.newEmail) {
                return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Xác thực email mới để tiếp tục, hoặc', 'auth');
            }
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Vui lòng xác thực email để tiếp tục', 'auth');
        }

        let data = isUserExist.dataValues;
        const jwtToken = jwt.sign({ authId: data.id, name: data.name, email: data.email }, process.env.SECRET_TOKEN, { expiresIn: '2h' });
        delete data.password;
        delete data.confirmed;
        delete data.blocked;
        delete data.newEmail;
        delete data.confirmToken;
        delete data.deleted;
        data.jwt = jwtToken;
        return transformSuccessResponse(data)
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Đăng nhập tài khoản không thành công', 'auth');

    }

}

const confirm = async (request) => {
    try {

        const isUserExist = await User.findOne({
            where: {
                confirmToken: request.params.confirmToken,
                confirmed: false,
                deleted: false,
            }
        });

        if (!isUserExist) return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Xác thực không thành công', 'auth');

        const data = isUserExist.dataValues;

        if (isUserExist.dataValues.newEmail) {
            // confirm update email
            const updatedUser = await User.update({
                confirmed: true,
                confirmToken: '',
                email: data.newEmail,
                newEmail: '',
            }, {
                where: { id: data.id }
            })
            const newData = { message: "success" }
            return transformSuccessResponse(newData);
        } else {
            // confirm create account
            const updatedUser = await User.update({
                confirmed: true,
                confirmToken: null
            }, {
                where: { id: data.id }
            })
            const newData = updatedUser.dataValues;
            delete newData.password;
            delete newData.confirmed;
            delete newData.blocked;
            delete newData.newEmail;
            delete newData.confirmToken;
            return transformSuccessResponse(newData);
        }
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Xác thực không thành công', 'auth');
    }
}


const changeEmail = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                id: request.body.authId,
                confirmed: true,
                deleted: false,
            }
        });

        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Tài khoản không tồn tại', 'user');
        }

        if (!checkHashedString(request.body.password, isUserExist.dataValues.password)) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mật khẩu không đúng', 'auth');
        }

        const isEmailExist = await await User.findOne({
            where: {
                email: request.body.newEmail,
                deleted: false,
            }
        });

        if (isEmailExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Email đã được sử dụng', 'user');
        }
        const confirmToken = uuidv4();


        const isChangeEmailSuccess = await User.update({
            newEmail: request.body.newEmail,
            deleted: false,
        }, {
            where: {
                id: request.body.authId
            }
        }).then(async (result) => {

            const message = `${process.env.FE_BASE_URL}/confirm/${confirmToken}`

            const isSendEmailSuccess = await sendEmail(request.body.newEmail, 'Click to confirm change email', message);
            if (!isSendEmailSuccess) {
                return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Gửi email xác thực không thành công', 'auth');
            }
        }).catch((error) => {

            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Thay đổi email không thành công', 'auth');
        })

        let data = { message: 'Vui lòng kiểm tra email mới: ' + request.body.newEmail }
        return transformSuccessResponse(data)
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Thay đổi email không thành công', 'auth');

    }
}

const forgotPassword = async (request) => {
    try {
        const isEmailExist = await await User.findOne({
            where: {
                email: request.body.email,
                deleted: false,
            }
        });
        if (!isEmailExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Email không tồn tại', 'auth');
        }

        let resetPasswordToken = '';
        const DEFAULT_CODE_LENGTH = 6;
        const characters = '0123456789';
        for (let i = 0; i < DEFAULT_CODE_LENGTH; i += 1) {
            resetPasswordToken += characters.charAt(Math.floor(Math.random() * 10));
        }

        const isChangeResetPasswordTokenSuccess = await User.update({
            resetPasswordToken: resetPasswordToken,
        }, {
            where: {
                email: request.body.email,
                deleted: false,
            }
        }).then(async (result) => {
            const message = `Mã đặt lại mật khẩu của bạn là ${resetPasswordToken}`

            const isSendEmailSuccess = await sendEmail(request.body.email, 'Reset password email', message);
            if (!isSendEmailSuccess) {
                return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Gửi email quên mật khẩu không thành công', 'auth');
            }
        })
        const data = { message: 'Vui lòng kiểm tra email' }
        return transformSuccessResponse(data)
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Quên mật khẩu không thành công', 'auth');
    }
}

const resetPassword = async (request) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                resetPasswordToken: request.body.token,
                deleted: false,
            }
        });
        if (!isUserExist) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Mã đặt lại mật khẩu không đúng', 'auth');
        }

        const hashedPassword = hashString(request.body.password);
        const resetPassword = await User.update({
            password: hashedPassword,
            resetPasswordToken: null,
        }, {
            where: {
                id: isUserExist.dataValues.id,
                deleted: false,
            }
        });

        const data = { message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại!' }
        return transformSuccessResponse(data);
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Đặt lại mật khẩu không thành công', 'auth');

    }
}

module.exports = {
    register,
    login,
    confirm,
    changeEmail,
    forgotPassword,
    resetPassword
}