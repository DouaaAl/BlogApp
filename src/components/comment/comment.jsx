"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import Styles from "./comment.module.css";
import { useState } from 'react';
import { updateLikes, updateDislikes } from '@/lib/create';

const comment = ({fullname, image, content, likes, dislikes, id}) => {
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [currentDisLikes, setCurrentDisLikes] = useState(dislikes);
    const [addLike, setAddLike] = useState(false);
    const [addDislike, setAddDislike] = useState(false);


    useEffect(()=>{
        const updateCommentDislikes = async() =>{
            let comment = await updateDislikes(id, currentDisLikes);
            console.log(id, currentDisLikes, comment);
        }
        updateCommentDislikes();
    },[currentDisLikes])

    useEffect(()=>{
        const updateCommentLikes = async() =>{
            let comment = await updateLikes(id, currentLikes);
        }
    
        updateCommentLikes();
    },[currentLikes])


  return (
    <article className={Styles.comment}>
        <div>
            <Image className={Styles.profilePic}
            src={image}
            height={80}
            width={80}
            alt='profile pic'
            />
            <h3>{fullname}</h3>
        </div>
            <p>{content}</p>
            <div className={Styles.likes}>
                <span>
                    <h5 className={Styles.green}>{currentLikes}</h5>
                    <Image onClick={(e)=>{
                        if(addLike){
                            setCurrentLikes(currentLikes - 1)
                        }
                        else{
                            setCurrentLikes(currentLikes + 1)
                        }
                        setAddLike(!addLike);
                    }}
                     src="/like.png"
                     width={30}
                     height={30}
                     alt='like'
                    />
                </span>
                <span>
                <h5 className={Styles.red}>{currentDisLikes}</h5>
                    <Image onClick={(e)=>{
                        if(addDislike){
                            setCurrentDisLikes(currentDisLikes - 1)
                        }
                        else{
                            setCurrentDisLikes(currentDisLikes + 1)
                        }
                        setAddDislike(!addDislike);
                    }}
                     src="/dislike.png"
                     width={30}
                     height={30}
                     alt='Dislike'
                    />
                </span>
            </div>
    </article>
  )
}

export default comment