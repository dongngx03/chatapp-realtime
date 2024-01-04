import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { formSignIn } from '../../interface';
import * as Yup from "yup";
import Swal from 'sweetalert2';




const SignIn:React.FC = () => {
  const formik = useFormik<formSignIn>({
    initialValues : {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Bạn chưa nhập email").email("email không đúng định dạng"),
      password: Yup.string().required("Bạn chưa nhập mật khẩu").min(8, "Tối thiểu 8 ký tự")
    }),
    onSubmit: async (data:object):Promise<void> => {
      try {
        const url:string = "http://localhost:8080/api/auth/signin";
        const res:any = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(data)
        })

        const value:any = await res.json();

        if(res.status === 400) {
          Swal.fire({
            title: 'Lỗi',
            text: value.message,
            icon: 'error',
            confirmButtonText: 'Quay lại'
          });
          return value
        }

        if(res.status === 500) {
          Swal.fire({
            title: 'Lỗi',
            text: value.message,
            icon: 'error',
            confirmButtonText: 'Quay lại'
          });
          return value
        }

        if(res.status === 200) {
          Swal.fire({
            title: 'Thành công',
            text: value.message,
            icon: 'success',
            confirmButtonText: 'Tiếp tục'
          }).then((result) => {
            if(result.isConfirmed) {
              sessionStorage.setItem('user_name', value.user.username);
              sessionStorage.setItem('user_id', value.user.user_id);
              sessionStorage.setItem('token', value.token)
              window.location.href = "/chatroom"
            }
          });
        }
      } catch (error) {
        console.log(error);  
      }
    }
  })

 
  return (
    <div className='tw-w-full tw-h-screen d-flex justify-content-center align-items-center tw-bg-[#2F3949]'>
      <div className='tw-w-1/3 tw-h-auto tw-bg-gray-50 tw-p-10 tw-shadow-lg tw-rounded-lg'>
        <h3>Đăng nhập</h3>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input 
              type="text" 
              className='form-control'
              placeholder='example@gmail.com'
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {
              formik.errors.email &&(
                <span className='tw-text-red-500 tw-text-xs'>{formik.errors.email}</span>
              )
            }
          </div>

          <div className='mb-3'> 
            <label htmlFor="">Mật khẩu</label>
            <input 
              type="password" 
              className='form-control'
              placeholder='123xyz..'
              id='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {
              formik.errors.password &&(
                <span className='tw-text-red-500 tw-text-xs'>{formik.errors.password}</span>
              )
            }
          </div>

          <div className="mb-3">
            <Button htmlType='submit' className='tw-bg-blue-500 tw-text-white tw-w-full'>Đăng nhập</Button>
          </div>
          <hr />
          <div className='mb-3'>
            <span>Bạn chưa có tài khoản? <Link to="/signup">Đăng Ký</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn