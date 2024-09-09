"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { getPost, getCategoryById, getUserById,  deletePost, publishingPost} from '@/lib/create';
import { getUser } from '@/lib/user';
import Change from "./edit"
import Comments from "./createComment.jsx"
import Navbar from "@/components/navbar/navbar.jsx"
import Loading from '@/components/loading/loading';
import Footer from "@/components/footer/footer.jsx"
import Styles from "./post.module.css";


const page = () => {
    const [LoggedUser, setLoggedUser] = useState({});
    const [title, setTitle ] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [post, setPost] = useState({
        title: "",
        image: "",
        content: "",
        category: "",
        username: "",
        userImg: "",
        postId:""
    });
    const router = useParams();
    const [slug, setSlug] = useState(router.slug);
    const [changeState, setChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const changeRoute = useRouter();
    const [user, setUser] = useState({});

    const setPostState = async() =>{
        setLoading(true);
        setUser(getUser());
        if(slug.length > 1){
            const realPost = await getPost(slug);
            if(realPost){
                let user = await getUserById(realPost.authorId);
                let category = await getCategoryById(realPost?.categoryId);
                if(!realPost.published){
                    if(user.admin == false && realPost.authorId != user.id){
                        console.log("user admin: ", user.id, "realpost author Id: ", realPost.authorId, "user admin: ", user.admin)
                        changeRoute.push("/")
                    }
                }
                let storageUser = await getUser();
                setLoggedUser({username: storageUser.name, postUser: user.fullname, admin: storageUser.admin}
                )
                setPost((prev)=>{
                    return {...prev, title: realPost.title, image: realPost.image, content: realPost.content, category, username: user.fullname, userImg: user.image, published: realPost.published,
                        postId: realPost.postId
                    }
                })
                setTitle(realPost.title);
                setCategoryId(realPost.categoryId);
                setContent(realPost.content);
                console.log(realPost);
            }
        }
        setLoading(false);
    }

    const deleteCurrentPost = async() =>{
        setLoading(true);
        const post = await deletePost(slug);
        setLoading(false);
        changeRoute.push("/");
    }

    const publishPost = async()=>{
        await  publishingPost(slug);
        await setPostState();
    }

    // USE EFFECT
    useEffect(()=>{ 
        setSlug(router.slug)
        if (slug != ""){
            setPostState();
        }
    },[])


    if(loading){
        return <Loading />
    }

  return (
    <>
    <Navbar />
 <div className={Styles.profileTop}>
 {(LoggedUser.admin || LoggedUser.name == LoggedUser.currentUser) && <div className={Styles.changes}>
                <button onClick={(e)=>{
                    setChange((prev)=>{
                        return !prev
                    })
                }}>Edit</button>
                <button onClick={deleteCurrentPost}>Delete</button>
                {(post?.published == false) && <button  onClick={publishPost}>Publish</button>}
                
            </div>}
            <Image className={Styles.profilePic}
            src={post.userImg}
            height={80}
            width={80}
            alt='post'
            />   
            <h1>{post.username}</h1>
    </div>
    
    {!changeState && <section className={Styles.post}>
            <div>
            </div>            
            <Image
            src={post.image}
            height={700}
            width={700}
            />
            <h3 className={Styles.category}>{post.category}</h3>
            <h1 className={Styles.title}>{post.title}</h1>
            <p>{post.content}
            </p>

        </section>}

    <Change title={title} setTitle={setTitle}  setPost={setPost} content={content} setContent={setContent} categoryId={categoryId} setCategoryId={setCategoryId} changeState={changeState} slug={slug}/>
    {(post?.image || !post.image) && <Comments postId={post.postId} />}
    <Footer />
    </>
  )
}

export default page