import React from 'react'
import { Button } from 'antd'
import { BtnSignUpProps } from '../../interface'
import { useNavigate } from 'react-router-dom'

const BtnSignUp:React.FC<BtnSignUpProps> = ({className}) => {
  const navigate:any = useNavigate();
  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    navigate('/signup')
  }
  return (
    <>
        <Button onClick={handleSignUp} className={className}>Đăng ký</Button>
    </>
  )
}

export default BtnSignUp