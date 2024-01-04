import { validAddUser, validSignIn } from "../validations/User"
import prisma from "../config/prisma"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

// signUp
export const signUp = async (req, res) => {
    try {
        const { error } = validAddUser.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((e) => e.message)
            return res.status(400).json({
                message: errors
            })
        }
        const user = await prisma.user.findUnique({
            where : {
                email: req.body.email
            }
        })

        if(user != null) {
            return res.status(400).json({
                message: "Email đã tồn tại vui lòng đăng ký bằng email khác ",
            })
        }

        const hashPW = await bcryptjs.hash(req.body.password, 10)

        const newUser = await prisma.user.create({
            data : {
                ...req.body,
                password : hashPW
            }
        })

        newUser.password = undefined
        return res.status(200).json({
            message: "Đăng ký thành công",
            userInfor: newUser
        })

    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const {error} = validSignIn.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.map((e) => e.message);
            return res.status(400).json({
                message: errors
            })
        }

        const user = await prisma.user.findUnique({
            where : {
                email : req.body.email
            }
        })

        if(user == null) {
            return res.status(400).json({
                message : "Email không tồn tại, vui lòng thử lại"
            })
        }

        const isMatch = await bcryptjs.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message : "Mật khẩu không trùng khớp"
            })
        }

        const accessToken = jwt.sign({user_id: user.user_id}, process.env.SECRET_CODE, {expiresIn : "1d"})

        user.password = undefined;
        return res.status(200).json({
            message : "Đăng nhập thành công",
            user : user,
            token : accessToken
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}