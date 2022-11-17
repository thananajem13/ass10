import joi from "joi";

export const updateProfile = {
    body: joi.object().required().keys({
        name: joi.string().trim().messages({
            "string.empty": "fill name filed, shouldn't be empty",
            "string.base": "name must be a string",
            "any.required": "name is required"
        }),
        email: joi.string().trim().email().messages({
            "string.empty": "fill email filed, shouldn't be empty",
            "string.base": "email must be a string",
            "string.email": "fill a valid email",
            "any.required": "email is required"
        }),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-])[A-Za-z\d@$!%*?&.\-]{8,}$/)).messages({
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
    }),
   
    headers:joi.object().required().keys({
        authorization:joi.string().required().messages({
            "string.empty":"fill authorization filed, shouldn't be empty",
            "string.base":"authorization must be a string",
            "any.required":"authorization is required"
        })}).options({ allowUnknown: true })



}
export const userPosts = {
     
    params:joi.object().required().keys({
        _id:joi.string().required().min(24).max(24).messages({
            "string.min":"id must has 24 length",
            "string.max":"id must has 24 length",
            "string.empty": "fill id filed, shouldn't be empty",
            "string.base": "id must be a string",
            "any.required": "id is required"
            
        }),
        page: joi.number().positive().messages({
            "number.positive": "page must be positive",
            "number.base": "page must be a number"
        }),
        size: joi.number().positive().messages({
            "number.positive": "size must be positive",
            "number.base": "size must be a number"
        }),
    }),
    


}
// export const profilePic = {
//     file:joi.object().required().keys({
//         image:joi.string().required().messages({
//             "string.empty": "fill image filed, shouldn't be empty",
//             "string.base": "image must be a string",
//             "any.required": "image is required"
//         })
//     })
// }
export const softDelete = {
     
    params:joi.object().required().keys({
        id:joi.string().required().min(24).max(24).messages({
            "string.min":"id must has 24 length",
            "string.max":"id must has 24 length",
            "string.empty": "fill id filed, shouldn't be empty",
            "string.base": "id must be a string",
            "any.required": "id is required"
            
        })
    }),
    headers:joi.object().required().keys({
        authorization:joi.string().required().messages({
            "string.empty":"fill authorization filed, shouldn't be empty",
            "string.base":"authorization must be a string",
            "any.required":"authorization is required"
        })}).options({ allowUnknown: true })



}
export const blockUser = {
    params:joi.object().required().keys({
        id:joi.string().required().min(24).max(24).messages({
            "string.min":"id must has 24 length",
            "string.max":"id must has 24 length",
            "string.empty": "fill id filed, shouldn't be empty",
            "string.base": "id must be a string",
            "any.required": "id is required"
            
        })
    }),
    headers:joi.object().required().keys({
        authorization:joi.string().required().messages({
            "string.empty":"fill authorization filed, shouldn't be empty",
            "string.base":"authorization must be a string",
            "any.required":"authorization is required"
        })}).options({ allowUnknown: true })

}