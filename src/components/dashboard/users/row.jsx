import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPostWithInfo, deleteUser, deletePostsUser } from '@/lib/dashboard'
import Loading from '@/components/loading/loading'

const row = ({fullname, email, id, getUsers}) => {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const getNumber = async() =>{
    setLoading(true);
    const posts=  await getPostWithInfo('',email, fullname);
    setNumber(posts.length);
    setLoading(false);
  }
  const deleteCurrentUser = async()=>{
    if(getUsers){
      setLoading(true);
      const posts = await deletePostsUser(id);
      const user = await deleteUser(email);
      await getUsers();
      setLoading(false);
    }
  }

  useEffect(()=>{
    getNumber();
  },[])


  if (loading){
    return <Loading />
  }
  return (
    <li>
    <article>
      <h3>{fullname}</h3>
      <h3>{email}</h3>
      <h3>{number}</h3>
      <h3>
        <Image
        onClick={(e)=>deleteCurrentUser()}
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