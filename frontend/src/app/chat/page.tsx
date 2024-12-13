'use client'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import MessageBox from '../../components/MessageBox'
import GroupSidebar from '@/components/GroupSidebar'
import { useState } from 'react'
import Header from '@/components/Header'


interface RecieverDetails{
  id:string,
  username:string
}

const Chat = () => {
  const route = useRouter()
  const [ recieverDetails, setRecieverDetails ] = useState<RecieverDetails>({id:'',username:''})
  if (!localStorage.getItem('token')) {
    route.push('/login')
  }

  const getRecieverId = (id: string,username:string) => {
    setRecieverDetails({id,username})
  }
  return (
    <div className='bg-blue-100 '>
      <Header />
      <div className='grid grid-cols-[24%_72%] justify-around items-center mt-2 p-2'>
        <div className='flex flex-col gap-2 justify-between h-full'>
          <GroupSidebar/>
          <Sidebar getRecieverId={getRecieverId} />
        </div>
        <div>
          <MessageBox recieverDetails={recieverDetails} /></div>
      </div>
    </div>
  )
}
export default Chat
