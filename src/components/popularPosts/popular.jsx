"use client"
import React, {useState, useEffect} from 'react'
import Styles from "./popular.module.css"
import Post from "../minipost/post.jsx"
import { getAllPostSkip } from '@/lib/filterPost'
import Loading from "@/components/loading/loading.jsx"

const popular = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularPosts = async() =>{
    setLoading(true);
    let data = await getAllPostSkip(0, '', '');
    data = data.sort((a, b) => {
      let sumA = a.likes + a.dislikes
      let sumB = b.likes + b.dislikes
      return sumB - sumA
    });
    setPosts(data);
    setLoading(false);
  }
  useEffect(()=>{ 
    getPopularPosts();
  }, [])

  if(loading){
    return <Loading />
  }

  return (
    <section className={Styles.featuredSection}>
        <h1 className={Styles.title}>Popular Posts</h1>
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
           src="/popular/1.jpg"  
           category="FOOD"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/popular/2.jpg" 
           category="RESTAURANT"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
           />
          <Post
           src="/popular/3.jpg"
           category="DRINKS"
           title="Spaghetti Sauce With Groud Beef"
           text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio unde fuga beatae dignissimos pariatur error. Porro impedit autem quos consequatur."
            />
        </article>
    </section>
  )
}

export default popular