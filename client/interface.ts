export interface BtnLogInProps {
    className: string,
}

export interface BtnSignUpProps {
    className: string,
}
export interface formSignUp {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}
export type inforUser = {
    username: string,
    email: string,
    password: string
}

export interface formSignIn {
    email: string,
    password: string,
}


export interface AppContexts {
    user_id: string,
    user_name: string,
    token: string
}

export interface roomList {
    data: {
        chatroomusers: []
    }
}

export interface listRoomItem {
    chatroom: {
        id: number,
        name: string
    },
    chatroom_id: number,
    id: number,
    user_id: number
}

export interface CustomButtonElement extends HTMLButtonElement {
    dataset: {
        chatroom_id: string;
        chatroomuser_id: string;
        room_infor: any;
    }
}