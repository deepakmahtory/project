import { Link } from "react-router-dom"
import style from "./home.module.css"

const Home=()=>{
    return(
        <>
        <div className={style.nav}>
        <Link to="/createuser">CreateUser</Link>
        <Link to="/users">User</Link>
        </div>
       <h1>HOME</h1>
        </>
    )
}
export default Home