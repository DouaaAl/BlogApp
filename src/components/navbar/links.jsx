"use client"
import React, {useEffect, useState} from 'react'
import Styles from "./navbar.module.css"
import Link from 'next/link.js'
import { getUser } from "@/lib/user.ts"
import { useRouter } from 'next/navigation.js'

const links = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
    const logOutUser= ()=>{
        localStorage.removeItem("user");
        setUser(getUser())
        router.push("/")
      }
    useEffect(()=>{
      setUser(getUser())
    },[])
  return (
    <div className={Styles.links}>
      {
        user.fullname == "" && (
          <>          
      <Link href="/login">
        Log In
      </Link>
      <Link href="/register">
        Register
      </Link>
          </>
        )
      }
    {user.fullname != "" && (
      <>
    <Link href="/profile">
      Profile
    </Link>
    <Link href="/dashboard">
      Admin
    </Link>
    <Link onClick={logOutUser} href="#">
      Log Out
    </Link>
    </>
    )}
  </div>
  )
}

export default links