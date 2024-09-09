import React, {useState, useEffect} from 'react'
import Styles from "./comments.module.css"
import Row from "./row.jsx"
import { getCommentInfo } from '@/lib/dashboard';
import Loading from '@/components/loading/loading';

const comments = () => {

  const [comments, setComments] = useState([]);
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const getCurrentComments = async() =>{
    setLoading(true);
    let data = await getCommentInfo(fullName, title);
    setComments(data);
    setLoading(false);
  }
  useEffect(()=>{
    getCurrentComments();
  },[])

  if(loading){
    return <Loading />
  }

  return (
    <section className={Styles.comments}>
    <h1 className={Styles.title}>Comments</h1>
    <form onSubmit={(e)=>{
      e.preventDefault();
      getCurrentComments()
      }} className={Styles.form} action="">
      <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text" placeholder='Fullname..' />
      <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title...' />

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
          <h3>Post Title</h3>
          <h3>Admin</h3>
        </article>
      </li>
      {
        comments?.map((comment)=>{
          return <Row getCurrentComments={getCurrentComments} id={comment.id} postId={comment.postId} name={comment.fullname} />
        })
      }
    </ul>
  </section>
  )
}

export default comments