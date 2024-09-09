"use client"
import React from 'react'
import Styles from "./sidemenu.module.css"
import Image from 'next/image'

const sidemenu = ({changeState}) => {

  const openPosts = () =>{
      changeState((e)=>{
        return {categories: false, posts: true, users: false, comments: false}
      })
  }

  const openUsers = () =>{
    changeState((e)=>{
      return {categories: false, posts: false, users: true, comments: false}
    })
  }

  const openComments = () =>{
    changeState((e)=>{
      return {categories: false, posts: false, users: false, comments: true}
    })
}


const openCategories = () =>{
  changeState((e)=>{
    return {categories: true, posts: false, users: false, comments: false}
  })
}

  return (
    <article className={Styles.sidemenu}>
      <div className={Styles.title}>
        <Image
        src="/dashboard/dashboard.png"
        width={50}
        height={50}
        alt='dashboard'
        />
        <h1>Dashboard</h1>
      </div>
      <ul className={Styles.list}>
        <li onClick={openUsers}>
          <Image
          src="/dashboard/users.png"
          width={30}
          height={30}
          alt='users'
          />
          <h3>Users</h3>
        </li>
        <li onClick={openPosts}>
          <Image
          src="/dashboard/posts.png"
          width={30}
          height={30}
          alt='users'
          />
          <h3>Posts</h3>
        </li>
        <li onClick={openComments}>
          <Image
          src="/dashboard/comments.png"
          width={30}
          height={30}
          alt='users'
          />
          <h3>Comments</h3>
        </li>
        <li onClick={openCategories}>
          <Image
          src="/dashboard/categories.png"
          width={30}
          height={30}
          alt='users'
          />
          <h3>Categories</h3>
        </li>
      </ul>
    </article>
  )
}

export default sidemenu