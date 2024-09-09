"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import Styles from "./myposts.module.css"
import Row from "./row.jsx"
import { getCategories } from '@/lib/create'
import {getPostByInfo } from '@/lib/filterPost'
import Loading from '@/components/loading/loading'

const page = () => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async()=>{
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  }


  const getCurrentPosts = async(doloading=true) =>{
    if(doloading){
      setLoading(true);
    }
    else{
      setLoading(false);
    }
    const data = await getPostByInfo(title, selectedCategory);
    setPosts(data);
    setLoading(false);
  }

  useEffect(()=>{
    setLoading(true);
    getAllCategories();
  }, [])

  useEffect(()=>{
    getCurrentPosts(false);
  },[selectedCategory, title])


  if(loading){
    return <Loading />
  }

  return (
   <>
    <Navbar />
    <main className={Styles.posts}>
      <h1 className={Styles.title}>My Posts</h1>
      <form onSubmit={(e)=>{
        e.preventDefault();
      }} className={Styles.form}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title...' />
        <select onChange={(e)=>setSelectedCategory(e.target.value)} value={selectedCategory} name="" id="">
          <option value="">All</option>
          {categories?.map((cat)=>{
            return <option value={cat.id}>{cat.name}</option>
          })}
        </select>
      </form>
      <ul className={Styles.list}>
        <li>
            <h3>Image</h3>
            <h3>Title</h3>
            <h3>
                View
            </h3>
        </li>
        {
          posts?.map((post)=>{
            return <Row title={post.title} slug={post.slug} image={post.image} />
          })
        }
      </ul>
    </main>
    <Footer />
   </> 
  )
}

export default page