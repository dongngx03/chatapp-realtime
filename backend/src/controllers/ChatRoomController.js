import prisma from "../config/prisma"

// tạo box chat 
export const createBoxChat = async (req, res) => {
    const {name1, name2, id1, id2} = req.body
    try {
        // tạo boxchat
        const BoxChat = await prisma.chatroom.create({
            data : {
                name : `${name1}&${name2}`
            }
        })

        // cho 2 người vào chatroom
        const addInBox = await prisma.chatroomuser.createMany({
            data : [
                {
                    user_id : parseInt(id1),
                    chatroom_id : BoxChat.id
                },
                {
                    user_id : parseInt(id2),
                    chatroom_id : BoxChat.id
                }
            ],
            skipDuplicates : true
        })

        return res.status(200).json({
            message : "tạo boxchat thành công",
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
            where : {
                user_id : parseInt(req.params.id)
            },
            include : {
                chatroomusers : {
                    include : {
                        chatroom : true,
                    }
                }
            }
        })

        return res.status(200).json({
            data: roomList
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}