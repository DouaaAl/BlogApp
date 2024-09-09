"use client"
import React, { useEffect, useState } from 'react'
import Styles from "./featured.module.css"
import Post from "../minipost/post.jsx"
import { getAllPostSkip } from '@/lib/filterPost'
import Loading from '../loading/loading'

const Featured = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFeaturedPosts = async()=>{
    setLoading(true);
    const data = await getAllPostSkip(0, '', 'Featured');
    setLoading(false);
    setPosts(data);
  }
  useEffect(()=>{
    getFeaturedPosts();
  }, [])

  if (loading){
    return <Loading />
  }

  return (
    <section className={Styles.featuredSection}>
        <h1 className={Styles.title}>Featured Posts</h1>
        <article className={Styles.posts}>
          {posts.map((post)=>{
            return <Post
              src={post.image}
              category={post.categoyId}
              title={post.title}
              text={post.content}
              slug={post.slug}
            />
          })}
          <Post
           src="/featured/1.jpg"  
           category="FOOD"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/featured/2.jpg" 
           category="RESTAURANT"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/featured/3.jpg"
           category="DRINKS"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
            />
        </article>
    </section>
  )
}

export default Featured