'use client'

import axiosInstance from "@/services/axiosService"
import ApiEndPoints from "@/utils/apiEndpoints"
import { useEffect, useState } from "react"

type UserDetails = {
  _id: string;
  username: string;
};

type Member = {
  userDetails: UserDetails;
  isAdmin: boolean;
  _id: string;
};

type Group = {
  _id: string;
  groupName: string;
  members: Member[];
};

const GroupSidebar = () => {
  const [ myGroups, setMyGroups ] = useState<Array<Group>>([])
  const [ selectedGroup, setselectedGroup ] = useState<string>('')

  const getMyGroups = async () => {
    try {
      const res = await axiosInstance.get(ApiEndPoints.GET_MY_GROUPS.api())
      console.log(res)
      setMyGroups(res.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMyGroups()
  }, [])
  console.log(myGroups)
  return (
    <div className=" shadow-2xl rounded-2xl  max-h-[calc(52vh-100px)] h-[calc(52vh-100px)] p-2 bg-white ">
      <p className="font-bold">Groups</p>
      <div>
        {
          myGroups.map((el) => {
            return <p onClick={() => { setselectedGroup(el._id) }} key={el._id} className={`rounded-lg mt-2 p-2 cursor-pointer uppercase ${el._id === selectedGroup ? 'bg-blue-300' : 'bg-gray-200 '}`}>
              {el.groupName}
            </p>
          })
        }
      </div>
    </div>
  )
}
export default GroupSidebar