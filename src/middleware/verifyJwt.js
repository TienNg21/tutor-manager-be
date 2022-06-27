const jwt = require('jsonwebtoken');
const { HttpStatus, ErrorMessage } = require('../const');
const { transformErrorResponse } = require('../helper');

function auth(request, response, next) {
    let token;
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
        token = request.headers.authorization.split(' ')[1];
    }
    if (!token) return response.json(transformErrorResponse(HttpStatus.UNAUTHORIZED, ErrorMessage[HttpStatus.UNAUTHORIZED], 'auth'))


    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN, (error, authData) => {
            if (error) {
                console.log(error);
                return response.json(transformErrorResponse(HttpStatus.UNAUTHORIZED, ErrorMessage[HttpStatus.UNAUTHORIZED], 'auth'));
            } else {
                request.body.authId = authData.authId
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return response.json(transformErrorResponse(HttpStatus.UNAUTHORIZED, ErrorMessage[HttpStatus.UNAUTHORIZED], 'auth'));
    }
}
module.exports = { auth }