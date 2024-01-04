import Joi from "joi";

export const validAddUser = Joi.object({
    username: Joi.string().required().messages({
        "any.required" : "Vui lòng nhập tên",
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "any.required" : "Vui lòng nhập mật khẩu",
        "string.min": "Password phải có ít nhất {#litmit} ký tự",
        "string.max": "Password phải có ít hơn {#litmit + 1} ký tự",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email không được để trống!",
        "any.required": "Email là bắt buộc!",
        "string.email": "Email không đúng định dạng",
    }),
})

export const validSignIn = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty": "Email không được để trống!",
        "any.required": "Email là bắt buộc!",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "any.required" : "Vui lòng nhập mật khẩu",
        "string.min": "Password phải có ít nhất {#litmit} ký tự",
        "string.max": "Password phải có ít hơn {#litmit + 1} ký tự",
    }),
})