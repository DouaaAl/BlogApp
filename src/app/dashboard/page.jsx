"use client"
import React, { useEffect } from 'react'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import SideMenu from "@/components/dashboard/sidemenu/sidemenu.jsx"
import Users from "@/components/dashboard/users/users.jsx"
import Posts from "@/components/dashboard/posts/posts.jsx"
import Comments from "@/components/dashboard/comments/comments.jsx"
import Categories from "@/components/dashboard/categories/categories.jsx"
import Styles from "./dashboard.module.css"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/user'

const page = () => {
  const router = useRouter();
  const [dashboardState, useDashboardState] = useState({
    users: false,
    posts: false,
    comments: false,
    categories: true
  });
  const [user,setUser] = useState({});

  useEffect(()=>{
    setUser(getUser());
    if(!user || user?.fullname == ""){
      router.push("/")
    }
  },[])

  return (
   <>
    <Navbar />
      <main className={Styles.main}>
        <SideMenu changeState={useDashboardState} />
        <article>
          {dashboardState.users && <Users />}
          {dashboardState.posts && <Posts />}
          {dashboardState.comments && <Comments />}
          {dashboardState.categories && <Categories />}
        </article>
      </main>
    <Footer />
   </>
  )
}

export default page