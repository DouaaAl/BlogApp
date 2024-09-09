import React from 'react'
import Styles from "./profile.module.css"
import { useState } from 'react'
import { getUser } from '@/lib/user'
import { updatePassword } from '@/lib/profile'

const password = ({setUser}) => {
  const [err, setErr] = useState({
    newpassword: false,
    password: false,
    fill: false,
    server: false,
    message: ""
})
const [success, setSuccess] = useState({
  message: "Password Changed",
  state: false
});
const submit = async (e) =>{
  e.preventDefault();
  setErr({
    newpassword: false,
    password: false,
    fill: false,
    server: false,
    message: ""
})
  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());
  if (data.newpassword.length < 1 || data.confirmnewpassword.length < 1 || data.password.length < 1 || data.confirmpassword.length < 1){
    
    setErr((prev)=>{
      return {...prev, fill: true}
    })
    return;
  }
  if (data.newpassword != data.confirmnewpassword){
    setErr((prev)=>{
      return {...prev, newpassword: true}
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
  let newUser = await updatePassword({
    email: user.email,
    password: data.password,
    newpassword: data.newpassword
  })
  setSuccess(newUser);
}
  return (
    <form onSubmit={submit} action="">
             {err.newpassword && <h4 className={Styles.error}>New passwords don't match</h4>}
    {err.password && <h4 className={Styles.error}>Passwords don't match</h4>}
    {err.fill && <h4 className={Styles.error}>Fill all inputs</h4>}
    {err.server && <h4 className={Styles.error}>{err.message}</h4>}
    {success.state && <h4 className={Styles.success}>{success.message}</h4>}
                        <div>
                            <input name='newpassword' placeholder='New Password...' type="password" />
                            <input name='confirmnewpassword' placeholder="Confirm New Password..." type="password" />
                        </div>
                        <div>
                            <input name='password' placeholder='Password...' type="password" />
                            <input name='confirmpassword' placeholder='Confirm Password...' type="password" />
                        </div>
                        <button className={Styles.submitBtn}>Submit</button>
                    </form>
  )
}

export default password