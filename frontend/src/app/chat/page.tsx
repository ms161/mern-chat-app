'use client'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import MessageBox from './MessageBox'

const Chat = () => {
  const route = useRouter()
  if (!localStorage.getItem('token')) {
    route.push('/login')
  }
  return (
    <div className='flex gap-3'>
      <div><Sidebar/></div>
      <div><MessageBox/></div>
    </div>
  )
}
export default Chat