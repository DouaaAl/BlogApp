import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { deletePost, getCategoryById, getUserById } from '@/lib/create';
import Loading from '@/components/loading/loading';


const row = ({title, id, authorId, categoryId, getCurrentPosts}) => {

  const [user, setUser] = useState({});
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserAndCat = async()=>{
    setLoading(true);
    const data = await getUserById(authorId);
    setUser(data);
    const currentCategory = await getCategoryById(categoryId);
    setCategory(currentCategory);
    setLoading(false);
  }

  const deleteCurrentPost = async()=>{
    setLoading(true);
    const data = await deletePost(id);
    await getCurrentPosts();
    setLoading(false);
  }

  useEffect(()=>{
    getUserAndCat();
  },[])


  if(loading){
    return <Loading />
  }
  return (
    <li>
    <article>
      <h3>{user.fullname}</h3>
      <h3>{user.email}</h3>
      <h3>{title}</h3>
      <h3>{category}</h3>
      <h3>
        <Image
        onClick={deleteCurrentPost}
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