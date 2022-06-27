const userValidator = require('./user.validator');
const { auth } = require('../../middleware/verifyJwt')

const getUserProfile = async (request, response) => {
    auth(request, response, async () => {
        console.log('GET /api/user/me/profile');

        const data = await userValidator.getUserProfile(request);
        response.status(data.code).json(data);
    });
}

const updateProfile = async (request, response) => {
    auth(request, response, async () => {

        console.log('PUT /api/user/me/profile');

        const data = await userValidator.updateProfile(request);
        response.status(data.code).json(data);
    });
}

const changePassword = async (request, response) => {
    auth(request, response, async () => {

        console.log('PUT /api/user/me/password');

        const data = await userValidator.changePassword(request);
        response.status(data.code).json(data);
    });
}

module.exports = {
    getUserProfile,
    updateProfile,
    changePassword,
}