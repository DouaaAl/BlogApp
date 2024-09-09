"use client"
import React, {useState, useEffect} from 'react'
import Styles from "./new.module.css"
import Post from "../minipost/post.jsx"
import { getAllPostSkip } from '@/lib/filterPost'
import Loading from "@/components/loading/loading.jsx"

const newPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNewPosts = async()=>{
    setLoading(true);
    const data = await getAllPostSkip(0, '', 'New');
    setLoading(false);
    setPosts(data);
  }
  useEffect(()=>{
    getNewPosts();
  },[])

  
  if(loading){
    return <Loading />
  }

  return (
    <section className={Styles.featuredSection}>
        <h1 className={Styles.title}>Newest Posts</h1>
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
           src="/new/1.jpg"  
           category="FOOD"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/new/2.jpg" 
           category="RESTAURANT"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/new/3.jpg"
           category="DRINKS"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
            />
        </article>
    </section>
  )
}

export default newPosts