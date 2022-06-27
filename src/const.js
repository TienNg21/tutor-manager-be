const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    AWS_ERROR: 413,
    ITEM_NOT_FOUND: 444,
    ITEM_ALREADY_EXIST: 445,
    ITEM_INVALID: 446,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

const ErrorName = {
    [HttpStatus.NOT_FOUND]: 'NotFoundError',
    [HttpStatus.BAD_REQUEST]: 'BadRequestError',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'InternalServerError',
};

const ErrorMessage = {
    [HttpStatus.NOT_FOUND]: 'Not Found',
    [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
    [HttpStatus.BAD_REQUEST]: 'Bad Request',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

const DEFAULT_PAGINATION_LIMIT = 25;
const DEFAULT_PAGINATION_PAGE = 0;
const DEFAULT_ORDER_BY = 'grade';
const DEFAULT_ORDER_DIRECTION = 'ASC';

module.exports = {
    HttpStatus,
    ErrorName,
    ErrorMessage,
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
}