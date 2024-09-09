"use client"
import Styles from "./profile.module.css"
import { useState } from "react"
import { getUser} from "@/lib/user"
import { updateName } from "@/lib/profile"

const fullName = ({setUser}) => {

  const [err, setErr] = useState({
      names: false,
      password: false,
      fill: false,
      server: false,
      message: ""
  })
  const [success, setSuccess] = useState(false);
  const submit = async (e) =>{
    e.preventDefault();
    setErr({
      names: false,
      password: false,
      fill: false,
      server: false,
      message: ""
  })
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    if (data.newname.length < 1 || data.confirmnewname.length < 1 || data.password.length < 1 || data.confirmpassword.length < 1){
      
      setErr((prev)=>{
        return {...prev, fill: true}
      })
      return;
    }
    if (data.newname != data.confirmnewname){
      setErr((prev)=>{
        return {...prev, names: true}
      })
      return;
    }
    if (data.password != data.confirmpassword){
      setErr((prev)=>{
        return {...prev, password: true}
      })
      return;
    }
    let user = await getUser();
    if (user.err){
      setErr((prev)=>{
        return {...prev, message: user.message, server: true}
      })
    }
    let newUser = await updateName({
      email: user.email,
      password: data.password,
      name: data.newname
    })
    localStorage.setItem("user", newUser);
    setUser(JSON.parse(newUser));
  }
  return (
<form  onSubmit={submit}>
  {err.names && <h4 className={Styles.error}>Names don't match</h4>}
  {err.password && <h4 className={Styles.error}>Passwords don't match</h4>}
  {err.fill && <h4 className={Styles.error}>Fill all inputs</h4>}
  {err.server && <h4 className={Styles.error}>{err.message}</h4>}
  {success && <h4 className={Styles.success}>Name Changed</h4>}
  
        <div>
        <input name="newname" placeholder='New Name...' type="text" />
        <input name="confirmnewname"
            placeholder='Confirm New Name...' type="text" />
            </div>
                <div>
                    <input name="password" placeholder='Password...' type="password" />
                    <input name="confirmpassword" placeholder="Confirm Password..." type="password" />
                    </div>
                        <button className={Styles.submitBtn}>Submit</button>
</form>
  )
}

export default fullName