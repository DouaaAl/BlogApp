"use client"
import React from 'react'
import Styles from "./profile.module.css"
import { useState } from 'react'
import { getUser } from '@/lib/user'
import { updateEmail } from '@/lib/profile'

const email = ({setUser}) => {
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
    email: false,
    password: false,
    fill: false,
    server: false,
    message: ""
})
  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData.entries());
  if (data.newemail.length < 1 || data.confirmnewemail.length < 1 || data.password.length < 1 || data.confirmpassword.length < 1){
    
    setErr((prev)=>{
      return {...prev, fill: true}
    })
    return;
  }
  if (data.newemail != data.confirmnewemail){
    setErr((prev)=>{
      return {...prev, email: true}
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
  let newUser = await updateEmail({
    email: user.email,
    password: data.password,
    newemail: data.newemail
  })
  localStorage.setItem("user", newUser);
  setUser(JSON.parse(newUser));
}
  return (
    <form onSubmit={submit}>
        {err.email && <h4 className={Styles.error}>Emails don't match</h4>}
    {err.password && <h4 className={Styles.error}>Passwords don't match</h4>}
    {err.fill && <h4 className={Styles.error}>Fill all inputs</h4>}
    {err.server && <h4 className={Styles.error}>{err.message}</h4>}
    {success && <h4 className={Styles.success}>Name Changed</h4>}
                        <div>
                            <input name='newemail' type="text" placeholder='New email...' />
                            <input placeholder='Confirm New Email...' name='confirmnewemail' type="text" />
                        </div>
                        <div>
                            <input placeholder='Password...' name='password' type="password" />
                            <input placeholder='Confirm Password...' name='confirmpassword' type="password" />
                        </div>
                        <button className={Styles.submitBtn}>Submit</button>
                    </form>
  )
}

export default email