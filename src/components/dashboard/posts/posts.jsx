import React, {useState, useEffect} from 'react'
import Styles from "./posts.module.css"
import Row from "./row.jsx"
import { getPostWithInfo } from '@/lib/dashboard'
import Loading from '@/components/loading/loading'

const posts = () => {
  const [posts, setPosts] = useState([]);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    await getCurrentPosts();
    setLoading(false);
  }

  const getCurrentPosts = async()=>{
    setLoading(true);
    const posts = await getPostWithInfo(title, email, fullname, categoryName);
    setPosts(posts);
    setLoading(false);
  }

  useEffect(()=>{
    getCurrentPosts();
  },[])

  if(loading){
    return <Loading />
  }

  return (
    <section className={Styles.posts}>
    <h1 className={Styles.title}>Posts</h1>
    <form onSubmit={submit} className={Styles.form} action="">
      <input value={fullname} onChange={(e)=>setFullName(e.target.value)} type="text" placeholder='Fullname..' />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email...' />
      <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title...' />
      <input value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder='Category...' />
      <button>Search</button>
    </form>
    <ul className={Styles.list}>
      <li>
        <article>
          <h3>
            Name
          </h3>
          <h3>
            Email
          </h3>
          <h3>Title</h3>
          <h3>Category</h3>
          <h3>Admin</h3>
        </article>
      </li>
      {
        posts?.map((post)=>{
          return <Row getCurrentPosts categoryId={post.categoryId} title={post.title} authorId={post.authorId} id={post.id}/>
        })
      }
      <Row />
      <Row />
    </ul>
  </section>
  )
}

export default posts