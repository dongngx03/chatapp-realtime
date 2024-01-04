import prisma from "../config/prisma"

export const searchUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : req.params.id
            }
        })

        if(!user) {
            return res.status(400).json({
                message: "Không Tìm thấy người này"
            })
        }

        user.password = undefined
        return res.status(200).json({
            message: "tìm thành công",
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}