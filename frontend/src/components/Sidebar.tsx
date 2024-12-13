'use client'

import axiosInstance from "@/services/axiosService"
import ApiEndPoints from "@/utils/apiEndpoints"
import { useEffect, useState } from "react"

interface AllUser {
  _id: string,
  username: string
}

const Sidebar = ({ getRecieverId }) => {
  const [ allUser, setAllUsers ] = useState<Array<AllUser>>([])
  const [ selectedChat, setSelectedChat ] = useState<string>('')
  console.log(selectedChat)
  const getAllUsers = async () => {
    const users = await axiosInstance.get(ApiEndPoints.GET_ALL_USERS.api());
    setAllUsers(users.data.users)

    console.log(users)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className=" shadow-2xl rounded-2xl h-[calc(60vh-100px)] p-2 bg-white  max-h-[100vh]">
      <p className="font-bold">Peoples</p>
      {
        allUser.map((el) => {
          console.log(el._id === selectedChat, el._id, selectedChat)
          return <p onClick={() => { getRecieverId(el._id,el.username); setSelectedChat(el._id) }} className={`rounded-lg mt-2 p-2 cursor-pointer uppercase ${el._id === selectedChat ? 'bg-blue-300' : 'bg-gray-200 '}`} key={el._id}>
            {el.username}
          </p>
        })
      }
    </div>
  )
}
export default Sidebar
