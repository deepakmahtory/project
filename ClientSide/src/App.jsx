import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Components/Home"
import CreateUser from "./Components/CreateUser"
import User from "./Components/User"
import EditUser from "./Components/EditUser"

const App=()=>{
  return(
    <>
   <BrowserRouter>
 
      <Routes>
       <Route element={<Home/>}  path="/"/>
       <Route  element={<CreateUser/>} path="/createuser"/>
       <Route  element={<User/>} path="/users"/>
       <Route element={<EditUser/>} path="/edituser/:abc" />

      </Routes>
   </BrowserRouter>
    </>
  )
}
export default App