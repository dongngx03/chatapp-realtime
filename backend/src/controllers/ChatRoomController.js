import prisma from "../config/prisma"


// tạo box chat 
export const createBoxChat = async (req, res) => {
    const { name, user_id } = req.body
    try {
        // tạo phòng mới 
        const newRoom = await prisma.chatroom.create({
            data: {
                name: name
            }
        })

        // thêm người tạo phòng này vào phòng 
        const joinRoom = await prisma.chatroomuser.create({
            data: {
                user_id: parseInt(user_id),
                chatroom_id: parseInt(newRoom.id)
            }
        })

        return res.status(200).json({
            message: "Tạo phòng thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}


export const roomList = async (req, res) => {
    try {
        const roomList = await prisma.user.findUnique({
            where: {
                user_id: parseInt(req.params.id)
            },
            include: {
                chatroomusers: {
                    include: {
                        chatroom: true,
                    }
                }
            }
        })

        return res.status(200).json({
            data: roomList
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

// tham gia phòng chat 
export const joinBoxChat = async (req, res) => {
    const { user_id, chatroom_id } = req.body
    try {
        // check xem người dùng đã trong phòng ấy hay chưa 
        const checkRoom = await prisma.chatroomuser.findFirst({
            where: {
                AND: {
                    user_id: parseInt(user_id),
                    chatroom_id: parseInt(chatroom_id)
                }
            }
        })

        if (checkRoom != null) {
            return res.status(400).json({
                message: "Bạn đã ở trong phòng này rồi ?"
            })
        }

        // thêm người dùng vào boxchat 
        await prisma.chatroomuser.create({
            data: {
                user_id: parseInt(user_id),
                chatroom_id: parseInt(chatroom_id)
            }
        })

        return res.status(200).json({
            message: "Gia nhập thành công"
        })


    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

// lấy tất cả tin nhắn theo boxchat
export const getMessages = async (req, res) => {
    const { id } = req.body;
    try {
        // lấy tất cả tu nhắn của 1 boxchat : 
        const messages = await prisma.message.findMany({
            where: {
                chatroom_id: parseInt(id)
            },
            include: {
                user: true
            },
            take : 8,
            orderBy : {
                created_at : 'desc'
            }
        })

        return res.status(200).json({
            messages: messages.reverse()
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}
// gửi in nhắn 
export const sendMessage = async (req, res) => {
    const { user_id, chatroom_id, content, chatroomuser_id } = req.body
    try {
        // gửi tin nhắn 
        const mess = await prisma.message.create({
            data : {
                user_id : parseInt(user_id),
                chatroom_id : parseInt(chatroom_id),
                content : content,
                status : 1,
                chatroomuser_id : parseInt(chatroomuser_id)
            }
        })

        // lấy tin nhắn vừa gửi 
        const lastMess = await prisma.message.findUnique({
            where : {
                id : parseInt(mess.id)
            },
            include : {
                user : true
            }
        })

        return res.status(200).json({
            message : "Gửi thành công", 
            mess: lastMess
        })

    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}