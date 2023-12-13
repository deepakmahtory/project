import axios from "axios"
import { useEffect, useState } from "react"
import style from "./home.module.css"
import { Link } from "react-router-dom"
const User=()=>{
   
    const[userDetails,setUserDetails]=useState([])


        useEffect(()=>{
           axios.get("http://localhost:3500/allusers")
           .then((res)=>{
              console.log(res);
              setUserDetails(res.data)
           })
        },[])


     let deleteF=(id)=>{
        axios.delete(`http://localhost:3500/deleteusers/${id}`)
        window.location.assign("/users")
     }







    return(
        <>
        <h1>Users</h1>
        <div className={style.tableDiv}>
            {userDetails.map((e)=>{
                return(
                    <table>
                        <tr>
                            <td>Name : </td>
                            <td>{e.FirstName} {e.LastName}</td>
                        </tr>
                        <tr>
                            <td>Email :</td>
                            <td>{e.Email}</td>
                        </tr>
                        <tr>
                            <td>Mobile :</td>
                            <td>{e.Mobile}</td>
                        </tr>
                        <tr>
                            <td>Address 1 :</td>
                            <td>{e.Address1}</td>
                        </tr>
                        <tr>
                            <td>Address 2 :</td>
                            <td>{e.Address2}</td>
                        </tr>
                        <tr>
                            <td>State : </td>
                            <td>{e.State}</td>
                        </tr>
                        <tr>
                            <td>Country : </td>
                            <td>{e.Country}</td>
                        </tr>
                       
                        <tr>
                            <td>Zip Code : </td>
                            <td>{e.ZipCode}</td>
                        </tr>
                        <tr >
                            <div>
                            <Link to={`/edituser/${e._id}`}>Edit</Link>
                            <button onClick={()=>{deleteF(e._id)}}>Delete</button>
                           
                            </div>
                            <Link to="/">Go to Home</Link>
                        </tr>
                    </table>
                   
                )
            })}
        </div>
        </>
    )
}
export default User