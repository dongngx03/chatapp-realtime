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