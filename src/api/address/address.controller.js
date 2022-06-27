const addressValidator = require('./address.validator')

const getProvinceList = async (request, response) => {
    console.log('GET /api/address/province');

    const data = await addressValidator.getProvinceList(request);
    response.status(data.code).json(data);
}

const getDistrictByProvince = async (request, response) => {
    console.log('GET /api/address/district/:provinceId');

    const data = await addressValidator.getDistrictByProvince(request);
    response.status(data.code).json(data);
}

const getWardByDistrict = async (request, response) => {
    console.log('GET /api/address/ward/:districtId');

    const data = await addressValidator.getWardByDistrict(request);
    response.status(data.code).json(data);
}

module.exports = {
    getProvinceList,
    getDistrictByProvince,
    getWardByDistrict
}