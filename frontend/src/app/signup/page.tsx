'use client'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ApiEndPoints from '@/utils/apiEndpoints';
import { useRouter } from 'next/navigation';
import Toaster from '@/utils/toaster';
import axiosInstance from '@/services/axiosService';


interface SignUpDataProps {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const SignUp = () => {
  const [ open, setOpen ] = useState(false);

  const [ signUpData, setSignUpData ] = useState<SignUpDataProps>(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  )
  const route = useRouter()

  const handleSignUpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prevData: SignUpDataProps) => {
      return { ...prevData, [ e.target.name ]: e.target.value }
    })
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const res = await axiosInstance.post(ApiEndPoints.SIGNUP.api(), signUpData);
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, 5000);
      // const res = axios.post('http://localhost:5000/live-talk/api/v1/users/signup/', signUpData)
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }

  console.log(signUpData)

  return (
    <div className='flex justify-center items-center  m-auto h-[100vh] ' >
      <div className='shadow-2xl p-10 py-16  rounded-2xl bg-white'>
        <form action="" onSubmit={handleSignUp}>
          <div className=''>
            <TextField required name='username' onChange={handleSignUpData} size='small' className='w-80' id="outlined-basic-username" label="username" variant="outlined" />
          </div>
          <div className='mt-4'>

            <TextField required onChange={handleSignUpData} name='email' size='small' className='w-80' id="outlined-basic-email" label="Email" type='email' variant="outlined" />
          </div>
          <div className='mt-4'>

            <TextField required onChange={handleSignUpData} name='password' size='small' className='w-80' id="outlined-basic-password" label="Password" variant="outlined" type='password' />
          </div>
          <div className='mt-4'>

            <TextField required onChange={handleSignUpData} name='confirmPassword' size='small' className='w-80' id="outlined-basic-confirmPassword" label="Confirm Password" variant="outlined" type='password' />
          </div>
          <div className='mt-4'>
            <Button type='submit' className='w-80' variant="contained">Sign Up</Button>
          </div>
          <div className='mt-4'>
            <Button onClick={() => route.push('/login')} className='w-80' variant="contained">Already have an account?Login</Button>
          </div>
        </form>
        {open && <Toaster message='Account Created!' severity='success' />}

      </div>
    </div>)
}
export default SignUp