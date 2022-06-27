const { HttpStatus, DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } = require("../../const");
const Province = require("../../../database/models/Province");
const District = require("../../../database/models/District");

const { transformSuccessResponse, transformErrorResponse } = require('../../helper');
const Ward = require("../../../database/models/Ward");

const getProvinceList = async (request) => {
    try {
        const pagination = request?.query?.pagination;

        const provinceList = await Province.findAndCountAll({
            limit: Number(pagination?.limit) || DEFAULT_PAGINATION_LIMIT,
            offset: Number(pagination?.page * pagination?.limit) || DEFAULT_PAGINATION_PAGE,
        });

        return transformSuccessResponse(provinceList.rows, provinceList.count)
    } catch (error) {
        console.log(error);
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách tỉnh, thành phố', 'address');
    }
}

const getDistrictByProvince = async (request) => {
    try {
        const pagination = request?.query?.pagination;

        const districtList = await District.findAndCountAll({
            limit: Number(pagination?.limit) || DEFAULT_PAGINATION_LIMIT,
            offset: Number(pagination?.page * pagination?.limit) || DEFAULT_PAGINATION_PAGE,
            where: {
                provinceId: request.params.provinceId,
            }
        });
        if (!districtList) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách quận, huyện', 'address');

        }
        return transformSuccessResponse(districtList.rows, districtList.count)
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách quận, huyện', 'address');

    }
}

const getWardByDistrict = async (request) => {
    try {
        const pagination = request?.query?.pagination;

        const wardList = await Ward.findAndCountAll({
            limit: Number(pagination?.limit) || DEFAULT_PAGINATION_LIMIT,
            offset: Number(pagination?.page * pagination?.limit) || DEFAULT_PAGINATION_PAGE,
            where: {
                districtId: request.params.districtId,
            }
        });
        if (!wardList) {
            return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách phường, xã', 'address');
        }
        return transformSuccessResponse(wardList.rows, wardList.count)
    } catch (error) {
        return transformErrorResponse(HttpStatus.BAD_REQUEST, 'Không thể tìm thấy danh sách phường, xã', 'address');

    }
}

module.exports = {
    getProvinceList,
    getDistrictByProvince,
    getWardByDistrict
}