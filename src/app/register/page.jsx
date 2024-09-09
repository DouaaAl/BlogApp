"use client"
import React from 'react'
import Navbar from "@/components/navbar/navbar.jsx"
import Footer from "@/components/footer/footer.jsx"
import Styles from "./register.module.css"
import Loading from "@/components/loading/loading.jsx"
import { useState } from 'react'
import { createUser } from '@/lib/auth'
import {useRouter} from "next/navigation"


const page = () => {
  const router = useRouter();
  const [errState, useErrState] = useState({
    email: false,
    password: false,
    exist: false,
    fill: false
  })
  const [success, useSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async(e)=>{
    e.preventDefault();
    useErrState({
      email: false,
      password: false,
      exist: false,
      fill: false
    })
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if(!data.fullname || !data.email || !data.confirmemail || !data.password || !data.confirmpassword){
      useErrState((prev)=>{
        return {...prev, fill: true}
      })
      return;
    }
    if(data.email != data.confirmemail){
      useErrState((prev)=>{
        return {...prev, email: true}
      })
      return;
    }
    if (data.password != data.confirmpassword){
      useErrState((prev)=>{
        return {...prev, password: true}
      })
      return;
    }
    setLoading(true);
    let newUser = await createUser(data);
    setLoading(false);
    if(newUser.message){
      useErrState((prev)=>{
        return {...prev, exist: true}
      })
      return;
    }
    if(newUser?.success){
      router.push("/login")
    }
  }

  if(loading){
    return <Loading />
  }

  return (
    <>
    <Navbar />
    <section className={Styles.register}>
      {errState.email && <h4 className={Styles.error}>Emails Don't match!!!</h4>}
      {errState.fill && <h4 className={Styles.error}>Fill All Fields!!!</h4>}
      {errState.password && <h4 className={Styles.error}>Passwords Don't match!!!</h4>}
      {errState.exist && <h4 className={Styles.error} >User Already exist!!!</h4>}    
      {success && <h4 className={Styles.success}>Registration successful</h4>}
          

          <article>
              <h1>Register</h1>
              <form onSubmit={register} action="#">
                <input name='fullname' type="text" placeholder='Name...' />
                <div>
                  <input name='email' type="email" placeholder='Email...' />
                    <input name='confirmemail' type="email" placeholder='Confirm Email..' />
                </div>
                <div>
                  <input name='password' type="password" placeholder='Password...' />
                  <input name='confirmpassword' type="password" placeholder='Confirm Password...' />
                </div>
                  <button>Register</button>
              </form>
          </article>
      </section>
      <Footer />
      </>
  )
}

export default page