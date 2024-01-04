import React from 'react'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { formSignUp, inforUser } from '../../interface';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignUp:React.FC = () => {
  const navigate:any = useNavigate();
  const formik = useFormik<formSignUp>({
    initialValues: {  
      username: "",
      password: "",
      email: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Vui lòng không được để trống"),
      email: Yup.string().required("Bạn chưa nhập email").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Email chưa hợp lệ"),
      password: Yup.string().required("Bạn chưa nhập mật khẩu").min(8, "mật khẩu tối thiểu 8 ký tự"),
      confirmPassword: Yup.string().required("Bạn chưa xác nhận lại mật khẩu").oneOf([Yup.ref('password'), ""], "Mật khẩu chưa trùng khớp")
    }),
    onSubmit: async ():Promise<void> => {

      const user:inforUser = {
        username: formik.values.username,
        password: formik.values.password,
        email: formik.values.email
      }

      try {
        const url:string = 'http://localhost:8080/api/auth/signup';
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })

        const data = await res.json();

        if(res.status === 400) {
         
          Swal.fire({
            title: 'Lỗi',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Quay lại'
          });

          return data
        }

        if(res.status === 500 ) {
          Swal.fire({
            title: 'Lỗi',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Quay lại'
          });
        }

        if(res.status === 200) {
          Swal.fire({
            title: 'Thành công',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Tiếp tục'
          }).then((result) => {
            if(result.isConfirmed) {
              navigate('/signin')
            }
          });
          console.log(data);
          
        }

      } catch (error) {
        console.log(error);
        
      }
      
    }
  })

  
  return (
    <div>
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
                formik.errors.email && (
                  <span className='tw-text-red-500 tw-text-xs'>{formik.errors.email}</span>
                )
              }
            </div>
            <div className="mb-3">
              <label htmlFor="">Tên</label>
              <input 
                type="text" 
                className='form-control'
                placeholder='Nguyễn văn A'
                id='username'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {
                formik.errors.username &&(
                  <span className='tw-text-red-500 tw-text-xs'>{formik.errors.username}</span>
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
            <div className='mb-3'> 
              <label htmlFor="">Nhập lại mật khẩu</label>
              <input 
                type="password" 
                className='form-control'
                placeholder='123xyz..'
                id='confirmPassword'
                name='confirmPassword'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {
                formik.errors.confirmPassword &&(
                  <span className='tw-text-red-500 tw-text-xs'>{formik.errors.confirmPassword}</span>
                )
              }
            </div>

            <div className="mb-3">
              <Button htmlType='submit' className='tw-bg-blue-500 tw-text-white tw-w-full'>Đăng Ký</Button>
            </div>
            <hr />
            <div className='mb-3'>
              <span>Bạn đã có tài khoản? <Link to="/signin">Đăng Nhập</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp