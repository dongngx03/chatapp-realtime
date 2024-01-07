import React from 'react'
import { Button } from 'antd'
import { BtnLogInProps } from "../../interface"
import { useNavigate } from 'react-router-dom'

const BtnSignIn: React.FC<BtnLogInProps> = ({ className }) => {
  const navigate: any = useNavigate();
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    navigate('/signin');
  }
  return (
    <>
      <Button onClick={handleSignIn} className={className}>Đăng nhập</Button>
    </>
  )
}

export default BtnSignIn