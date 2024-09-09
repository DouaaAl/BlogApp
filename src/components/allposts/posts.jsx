"use client"
import React, { useEffect, useState } from 'react'
import Styles from "./posts.module.css"
import Post from "../mediumPost/post.jsx"
import Image from 'next/image'

const posts = ({posts, setSkip, skip}) => {

  const [hideForward, setHideForward] = useState(true);
  const [hideBackward, setHideBackward] = useState(true);
  const skipForward = () =>{
    setHideForward(true);
    let allCount = posts.length / 3;
    if (skip < allCount){
      setSkip((prev) => {
        return prev + 3
      })
    } else {
      setHideForward(false);
    }
  }

  const skipBackwared = () =>{
    setHideBackward(true);
    if (skip < 3){
      setHideBackward(false);
    }else {
      setSkip((prev) => {
        return prev - 3
      })     
    }
  }

  return (
    <div className={Styles.posts}>
      {
        posts.map((post)=>{
          return <Post
            src={post.image}
            category={post.postType}
            desc={post.content}
            slug={post.slug}
          />
        })
      }
        <Post
        src="/featured/1.jpg"
        category="FOOD"
        desc="Cras pretium malesuada elit at aliquet. Praesent pulvinar, ante feugiat condimentum tincidunt, enim ligula semper eros, a luctus arcu ligula in nisl. In tempus lacus vel molestie pharetra. Pellentesque nec tortor malesuada, pulvinar ante vel, congue est. Maecenas aliquet mi id dolor tempor mollis. Pellentesque eu libero tincidunt, ultrices sem sed, porta justo. Curabitur placerat pulvinar purus vel ultricies."
        />
        <div className={Styles.pagination}>
        <span>
            <Image onClick={skipBackwared}
              src='/backward.png'
              height={50}
              width={50}
              alt="forward"
            />
          </span>
          <span>
            <Image onClick={skipForward}
              src='/forward.png'
              height={50}
              width={50}
              alt="forward"
            />
          </span>
        </div>
    </div>
  )
}

export default posts