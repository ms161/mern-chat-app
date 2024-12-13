'use client'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import MessageBox from './MessageBox'
import { useState } from 'react'
import Header from '@/components/Header'

const Chat = () => {
  const route = useRouter()
  const [ recieverId, setRecieverId ] = useState<string>('')
  if (!localStorage.getItem('token')) {
    route.push('/login')
  }

  const getRecieverId = (id: string) => {
    setRecieverId(id)
  }
  return (
    <div className='bg-gray-200 '>
      <Header />
      <div className='grid grid-cols-[24%_72%] justify-around items-center mt-2 p-2'>
        <div>
          <Sidebar getRecieverId={getRecieverId} />
        </div>
        <div>
          <MessageBox recieverId={recieverId} /></div>
      </div>
    </div>
  )
}
export default Chat
