import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
const Header = () => {
  const route = useRouter()
  const handleLogout = () => {
    route.push('/login')
  }
  return (
    <div className="bg-gray-500 p-4 rounded-b-xl uppercase flex items-center justify-between">

      <div >
        {localStorage.getItem('username')}
      </div>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
  )
}
export default Header