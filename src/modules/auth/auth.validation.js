import joi from 'joi'
export const signUp = {

    body: joi.object().required().keys({
        name: joi.string().trim().required().messages({
            "string.empty": "fill name filed, shouldn't be empty",
            "string.base": "name must be a string",
            "any.required": "name is required"
        }),
        email: joi.string().trim().email().required().messages({
            "string.empty": "fill email filed, shouldn't be empty",
            "string.base": "email must be a string",
            "string.email": "fill a valid email",
            "any.required": "email is required"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-])[A-Za-z\d@$!%*?&.\-]{8,}$/)).required().messages({
            'string.pattern.base': " password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
            "string.empty": "fill password filed, shouldn't be empty",
            "string.base": "password must be a string",
            "any.required": "password is required"
        }),
        age: joi.number().positive().messages({
            "number.positive": "age must be positive",
            "number.base": "age must be a number"
        }),
        gender: joi.string().trim().lowercase().valid('female', 'male').messages({
            "string.base": "gender must be a string",
            "any.only": "gender must be either male or female"
        }),
        cPassword: joi.string().valid(joi.ref('password')).required().messages({
            "string.base": "cPassword must be a string",
            "string.empty": "fill cPassword filed, shouldn't be empty",
            "any.only": "cPassword mismatch with password",
            "any.required": "cPassword is required"
        }),
        qrCode: joi.string().messages({
            "number.base": "qr code must be a number",
            "any.required": "qr code is required"

        })
    })
}
export const signIn = {

    body: joi.object().required().keys({
        email: joi.string().trim().email().required().messages({
            "string.empty": "fill email filed, shouldn't be empty",
            "string.base": "email must be a string",
            "string.email": "fill a valid email",
            "any.required": "email is required"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-])[A-Za-z\d@$!%*?&.\-]{8,}$/)).required().messages({
            'string.pattern.base': " password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
            "string.empty": "fill password filed, shouldn't be empty",
            "string.base": "password must be a string",
            "any.required": "password is required"
        })
    })
}

export const confirmEmail = {
    params: joi.object().required().keys({
        token: joi.string().required().messages({
            "string.empty": "fill token filed, shouldn't be empty",
            "string.base": "email must be a string",
            "any.required": "token is required"
        })
    })
}