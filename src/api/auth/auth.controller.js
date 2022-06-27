const authValidator = require('./auth.validator');
const { auth } = require('../../middleware/verifyJwt');

const register = async (request, response) => {
    console.log('/POST /api/user/auth/register');
    const data = await authValidator.register(request);
    response.status(data.code).json(data);
}

const login = async (request, response) => {
    console.log('/POST /api/user/auth/login');

    const data = await authValidator.login(request);
    await response.status(data.code).json(data);
}

const confirm = async (request, response) => {
    console.log('/POST /api/user/auth/confirm/:confirmToken');

    const data = await authValidator.confirm(request);
    await response.status(data.code).json(data);
}

const changeEmail = async (request, response) => {
    auth(request, response, async () => {
        console.log('PUT /api/user/auth/change-email');

        const data = await authValidator.changeEmail(request);
        response.status(data.code).json(data);
    });
}

const forgotPassword = async (request, response) => {
    console.log('/POST /api/user/auth/forgot-password');

    const data = await authValidator.forgotPassword(request);
    await response.status(data.code).json(data);
}

const resetPassword = async (request, response) => {
    console.log('/POST /api/user/auth/reset-password');

    const data = await authValidator.resetPassword(request);
    await response.status(data.code).json(data);
}

module.exports = {
    register,
    login,
    confirm,
    changeEmail,
    forgotPassword,
    resetPassword
}