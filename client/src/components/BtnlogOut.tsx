import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const BtnlogOut: React.FC = () => {
  const navigate = useNavigate();
  const handleLogOut: React.MouseEventHandler<HTMLButtonElement> = (e: any): void => {
    e.preventDefault();
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn muốn đăng xuất',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        navigate('/signin');
      }
    });

  }
  return (
    <>
      <Button onClick={handleLogOut} className='tw-text-[#7E8687] tw-border tw-border-[#7E8687]'>Logout</Button>
    </>
  )
}

export default BtnlogOut