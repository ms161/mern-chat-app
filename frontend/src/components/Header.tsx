import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
const Header = () => {
  const route = useRouter()
  const handleLogout = () => {
    route.push('/login')
  }
  return (
    <div className="bg-purple-600 p-4 rounded-b-xl uppercase flex items-center justify-between">

      <div className="text-white font-semibold">
        {localStorage.getItem('username')}
      </div>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
  )
}
export default Header