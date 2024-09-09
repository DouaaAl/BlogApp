import React, { useEffect, useState } from 'react';
import Styles from "./post.module.css";
import Comment from "@/components/comment/comment.jsx";
import { createPostComment, getComments, getPostId } from '@/lib/create';
import { getUser } from '@/lib/user';
import Loading from '@/components/loading/loading';
import { useParams } from 'next/navigation';

const CreateComment = ({}) => {
  const [comments, setComments] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [filled, setFilled] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const slug = useParams().slug;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let postData = {}
    let postId = await getPostId(slug);
    if (!user.name) {
      postData = {
        fullname: "John doe",
        image: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        postId,
        content: comment
      };
    } else {
        postData = {
          fullname: user.name,
          image: user.image || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
          postId: postId,
          content: comment
        };
      }
    let newComment = await createPostComment(postData);
    await findComments();
    setLoading(false);
  };

  const findComments = async () => {
    let postId = await getPostId(slug);
    setLoading(true);
    let data = await getComments(postId);
    setComments(data);
    setLoading(false);
  };

  const findUser = async () => {
    setLoading(true);
    const userData = await getUser();
    setUser(userData);
    setLoading(false);
  };

  useEffect(() => {
    setLoaded(true);
    findUser();
  }, []);

  useEffect(()=>{
    if(showComments){
      findComments();
    }
  }, [showComments])


  if(loading){
    return <Loading />
  }

  return (
    <section className={Styles.comments}>
      <h1>Create Comment</h1>
      <form onSubmit={submit}>
        <textarea onChange={(e)=>{
            if(e.target.value != ""){
              setFilled(false);
            }else{
              setFilled(true);
            }
            setComment(e.target.value)
          }} value={comment} name='content' placeholder='Comment...'></textarea>
        {loaded && <button type='submit'>Post</button>}
      </form>
      {filled && <h4 className={Styles.error}>Fill Comment Content</h4>}
      
      <h1>Comments</h1>
      <article className="commentsGrid">
        <button className={Styles.showComment} onClick={(e)=> setShowComments(!showComments)}>Show Comments</button>
        {loaded && showComments && comments != null && comments?.map((comment, index) => (
          <Comment key={index} id={comment.id} dislikes={comment?.dislikes} likes={comment?.likes} fullname={comment?.fullname} image={comment?.image} content={comment?.content} />
        ))}
      </article>
    </section>
  );
};

export default CreateComment;