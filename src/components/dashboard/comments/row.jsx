import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPostById, getUserById, id } from '@/lib/create';
import { deleteComment } from '@/lib/dashboard';
import Loading from '@/components/loading/loading';

const row = ({postId, name, id, getCurrentComments}) => {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  const getCurrentPost= async()=>{
    setLoading(true);
    const dataPost = await getPostById(postId);
    setPost(dataPost);
    const dataUser = await getUserById(dataPost?.authorId);
    setUser(dataUser);
    setLoading(false);
  }

  const deleteCurrentComment = async() =>{
    setLoading(true);
    const comment = await deleteComment(id);
    await getCurrentComments();
    setLoading(false);
  }

  useEffect(()=>{
    getCurrentPost();
  }, [])

  if(loading){
    return <Loading />
  }

  return (
    <li>
    <article>
      <h3>{name}</h3>
      <h3>{user?.email}</h3>
      <h3>{post?.title}</h3>
      <h3>
        <Image
        onClick={deleteCurrentComment}
        src="/dashboard/delete.png"
        width={30}
        height={30}
        alt="delete"
        />
      </h3>
    </article>
  </li>
  )
}

export default row