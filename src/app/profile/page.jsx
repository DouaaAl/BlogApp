"use client"
import React from 'react'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import Styles from "./profile.module.css"
import { useState, useEffect } from 'react'
import FullName from "./fullName.jsx"
import Email from "./email.jsx"
import Password from "./password.jsx"
import ChangeImage from "./image.jsx"
import { useRouter } from 'next/navigation'

const page = () => {
    const [infoState, useInfoState] = useState({
        fullname: true,
        email: false,
        password: false
    })
    const [user, setUser] = useState({})
    const router = useRouter()

    useEffect(()=>{
        const userJson = localStorage.getItem("user");
        if (userJson.fullname != "") {
            const user = JSON.parse(userJson);
            setUser(user);
            } else {
                router.push("/")
            }
    },[])

    const openFullName = (e) =>{
        useInfoState((prev)=>{
            return {...prev, fullname: !infoState.fullname}
        })
    }
    const openEmail =(e) =>{
        useInfoState((prev)=>{
            return {...prev, email: !infoState.email}
        }) 
    }
    const openPassword =(e) =>{
        useInfoState((prev)=>{
            return {...prev, password: !infoState.password}
        }) 
    }
  return (
    <>
        <Navbar />
        <main className={Styles.main}>
            <h1 className={Styles.title}>Profile</h1>
            <section>
                <ChangeImage setUser={setUser} user={user}/>
                <article>
                    <div>
                        <h3>FullName: {user.name}</h3>
                        <button onClick={openFullName} className={Styles.changeBtn}>Change</button>
                    </div>
                    {infoState.fullname &&  <FullName setUser={setUser} />}

                </article>
                <article>
                    <div>
                        <h3>Email: {user.email}</h3>
                        <button onClick={openEmail} className={Styles.changeBtn}>Change</button>
                    </div>
                    {infoState.email &&  <Email setUser={setUser} />}
                   
                </article>
                <article>
                    <div>
                        <h3>Password</h3>
                        <button onClick={openPassword} className={Styles.changeBtn}>Change</button>
                    </div>
                    {infoState.password && <Password setUser={setUser}/>}
                    
                </article>
            </section>
        </main>
        <Footer />
    </>
  )
}

export default page