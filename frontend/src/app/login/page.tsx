'use client'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import axios from 'axios';
import ApiEndPoints from '@/utils/apiEndpoints';

interface loginDataProps {
  email: string,
  password: string,
}

const Login = () => {
  const [ loginData, setLoginData ] = useState<loginDataProps>({ email: '', password: '', })
  const route = useRouter()
  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData: loginDataProps) => {
      return { ...prevData, [ e.target.name ]: e.target.value }
    })
  }

  const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
    try {
      e.preventDefault()
      const res = await axios.post(ApiEndPoints.LOGIN.api(), loginData);
      localStorage.setItem('token',res.data.token)
      route.push('/chat')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(loginData)
  

  return (
    <div className='flex justify-center items-center m-auto h-[100vh] ' >
      <div className='shadow-2xl p-10 py-24 rounded-md h-max'>
<form action="" onSubmit={handleLogin}>        <div className=''>
          <TextField required name='email' type='email' onChange={handleLoginData} size='small' className='w-80' id="outlined-basic-email" label="Email" variant="outlined" />
        </div>
        <div className='mt-4'>

          <TextField required name='password' onChange={handleLoginData} size='small' className='w-80' id="outlined-basic-password" label="Password" variant="outlined" type='password' />
        </div>
        <div className='mt-4'>
          <Button type='submit' className='w-80' variant="contained">Log In</Button>
        </div>
        <div className='mt-4'>
          <Button  onClick={() => route.push('/signup')} className='w-80' variant="contained">Dont have an Account?Sign Up</Button>
        </div>
        </form>

      </div>
    </div>
  )
}
export default Login