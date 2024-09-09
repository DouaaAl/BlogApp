"use client"
import React from 'react'
import Navbar from "@/components/navbar/navbar.jsx"
import Footer from '@/components/footer/footer'
import Styles from "./login.module.css"
import Loading from "@/components/loading/loading.jsx"
import { loginUser } from '@/lib/auth'
import { useState } from 'react'
import {useRouter} from "next/navigation"


const page = ({children, href}) => {

  const router = useRouter();
  const [err, useErrState] = useState({
    message: "",
    err: false
  })
  const [fill, useSFillState] = useState(false)
  const [loading, setLoading] = useState(false);

  const login = async(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    setLoading(true);
    let user = await loginUser(data);
    setLoading(false);
    if(user.err){
      useErrState(user)
      return;
    }
    else{
      await localStorage.setItem("user", user.user)
      router.push("/");
    }
  }

  if (loading){
    return <Loading />
  }

  return (
    <>
    <Navbar />
    <section className={Styles.login}>
      {err.err && <h4 className={Styles.error}>{err.message}</h4>}
      {fill && <h4 className={Styles.error}>Missing Info !!!</h4>}
        <article>
            <h1>LogIn</h1>
            <form onSubmit={login}>
                <input name="email" type="email" id="email" placeholder='Email...' />
                <input name='password' type="password" placeholder='Password...' />
                <button type='submit' >LogIn</button>
            </form>
        </article>
    </section>
    <Footer />
    </>
  )
}

export default page