
const classValidator = require('./class.validator')
const { auth } = require('../../middleware/verifyJwt')

const createClass = async (request, response) => {
    auth(request, response, async () => {

        console.log('POST /api/classes');

        const data = await classValidator.createClass(request);
        response.status(data.code).json(data);
    });
}

const getClasses = async (request, response) => {
    auth(request, response, async () => {

        console.log('GET /api/classes');

        const data = await classValidator.getClasses(request);
        response.status(data.code).json(data);
    });
}

const getClassById = async (request, response) => {
    auth(request, response, async () => {

        console.log('GET /api/classes/:classId');

        const data = await classValidator.getClassById(request);
        response.status(data.code).json(data);
    });
}

const updateClass = async (request, response) => {
    auth(request, response, async () => {
        console.log('PUT /api/classes/:classId');

        const data = await classValidator.updateClass(request);
        response.status(data.code).json(data);
    })
}

const deleteClass = async (request, response) => {
    auth(request, response, async () => {
        console.log('DELETE /api/classes/:classId');

        const data = await classValidator.deleteClass(request);
        response.status(data.code).json(data);
    })
}

module.exports = {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass
}