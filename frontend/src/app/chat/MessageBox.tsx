'use client'
import axiosInstance from "@/services/axiosService"
import ApiEndPoints from "@/utils/apiEndpoints"
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react"
interface User {
  _id: string;
  username: string;
}

interface Chat {
  _id: string;
  message: string;
  sender: User;
  reciever: User;
  createdAt: string; // ISO Date string
}



const MessageBox = ({ recieverId }: { recieverId: string }) => {
  const [ messages, setMessages ] = useState<Array<Chat>>([])
  const [ sendMessage, setSendMessage ] = useState<string>('')


  const getOneToOneChat = async () => {
    const res = await axiosInstance.get(ApiEndPoints.GET_ONE_TO_ONE_CHAT.api(recieverId))

    setMessages(res.data.chats)

  }

  const sendChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendMessage('')
    const res = await axiosInstance.post(ApiEndPoints.SEND_CHAT.api(recieverId), { message: sendMessage })
    console.log(res)
  }
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessage(e.target.value)
  }


  useEffect(() => {
    if (recieverId)
      getOneToOneChat()

  }, [ recieverId ])

  console.log(messages)



  return (
    <div className="h-[calc(100vh-100px)]  rounded-lg bg-white">
      <div className=" rounded-2xl p-3 shadow-2xl h-full bg-white flex">
        {recieverId ? <div className="flex flex-col justify-between bg-white h-full w-full" >
          <div className="max-h-[calc(100vh-160px)]  overflow-y-scroll">
            {
              messages.map((el) => (
                <p key={el._id} className={`p-1 bg-green-300 mt-1 w-max rounded-xl px-4 ${el.sender.username == localStorage.getItem('username') ? 'ml-auto' : ''}`}>
                  {el.message}

                </p>
              ))
            }

          </div>
          <form action="" onSubmit={sendChat}>
            <div className="flex">
              <TextField value={sendMessage} onChange={handleMessage} size="small" className="w-full" placeholder="Send a message..." />
              <Button type="submit" size="small" variant="contained" className="relative right-0">Send</Button>
            </div>
          </form>
        </div> : <h1 className="m-auto text-2xl ">Select Someone to chat</h1>}
      </div>
    </div>
  )
}
export default MessageBox
