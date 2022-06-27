const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const { HttpStatus, ErrorMessage } = require("./const");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.AUTH_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN,
            },
        });

        await transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });
        console.log(`Send email to ${email}!`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const transformSuccessResponse = (response, totalItem = response.length) => {
    if (response) {
        if (Array.isArray(response)) {
            let returnRes = {
                data: {
                    items: response,
                    totalItem: totalItem | 0,
                },
                code: HttpStatus.OK,
                message: 'OK',

            }
            return returnRes;
        } else {
            if (response.jwt) {
                const jwt = response.jwt;
                delete response.jwt;
                let returnRes = {
                    jwt: jwt,
                    data: response,
                    code: HttpStatus.OK,
                    message: 'OK',
                }
                return returnRes;

            } else {

                let returnRes = {
                    data: response,
                    code: HttpStatus.OK,
                    message: 'OK',
                }
                return returnRes;
            }
        }
    }
}

const transformErrorResponse = (errorCode, customMessage = null, key = null) => {
    return {
        code: errorCode,
        message: customMessage ? customMessage : ErrorMessage[errorCode],
        errors: [
            {
                key: key ? key : null,
                errorCode: errorCode,
                message: customMessage ? customMessage : ErrorMessage[errorCode],
            },
        ],
    }
}

const hashString = (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedString = bcrypt.hashSync(string, salt);

    return hashedString;
}

const checkHashedString = (hashedString, string) => {
    return bcrypt.compareSync(hashedString, string);
}

module.exports = {
    sendEmail,
    transformSuccessResponse,
    transformErrorResponse,
    hashString,
    checkHashedString
}