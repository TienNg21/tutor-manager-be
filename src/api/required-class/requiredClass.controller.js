
const requiredClassValidator = require('./requiredClass.validator')
const { auth } = require('../../middleware/verifyJwt')

const createRequiredClass = async (request, response) => {
    auth(request, response, async () => {

        console.log('POST /api/required-classes');

        const data = await requiredClassValidator.createRequiredClass(request);
        response.status(data.code).json(data);
    });
}

const getRequiredClasses = async (request, response) => {
    auth(request, response, async () => {

        console.log('GET /api/required-classes');

        const data = await requiredClassValidator.getRequiredClasses(request);
        response.status(data.code).json(data);
    });
}

const getRequiredClassById = async (request, response) => {
    auth(request, response, async () => {

        console.log('GET /api/required-classes/:requiredClassId');

        const data = await requiredClassValidator.getRequiredClassById(request);
        response.status(data.code).json(data);
    });
}

const updateRequiredClass = async (request, response) => {
    auth(request, response, async () => {

        console.log('PUT /api/required-classes/:requiredClassId');

        const data = await requiredClassValidator.updateRequiredClass(request);
        response.status(data.code).json(data);
    })
}

const deleteRequiredClass = async (request, response) => {
    auth(request, response, async () => {
        console.log('DELETE /api/required-classes/:requiredClassId');

        const data = await requiredClassValidator.deleteRequiredClass(request);
        response.status(data.code).json(data);
    })
}

module.exports = {
    createRequiredClass,
    getRequiredClasses,
    getRequiredClassById,
    updateRequiredClass,
    deleteRequiredClass
}