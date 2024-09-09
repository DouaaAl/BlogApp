import React, { useEffect, useState  } from 'react'
import Styles from "./post.module.css"
import { uploadFiletoS3 } from '@/lib/image';
import { getCategories, updatePost } from '@/lib/create';
import Loading from '@/components/loading/loading';

const edit = ({changeState, slug, setPost, title, setTitle, content, setContent, categoryId, setCategoryId}) => {

    const [image, setImage] = useState({})
    const [categories, setCategories] = useState({})
    const [loading, setLoading] = useState(false);

    const getCategoriesBD = async()=>{
        setLoading(true);
        let allCategories = await getCategories();
        setCategories(allCategories);
        setLoading(false);
    }
    const changePost = async (e) => {
        setLoading(true);
            e.preventDefault();
            let postInfo = {
                title: title,
                categoryId: categoryId,
                content: content,
            };
            let category = '';
            categories.forEach((cat)=>{
                if(cat.id == categoryId){
                    category = cat.name;
            }
            })
            if (image.size === undefined || image.size < 1) {
                setPost((prev)=>{
                    return {...prev, title, content: content, category}
                })
                await updatePost(slug, postInfo);
            } else {

                const reader = new FileReader();
                let link = "";
                reader.onloadend = async () => {
                  const base64String = reader.result;
                  const base64Data = base64String?.replace(/^data:image\/[a-z]+;base64,/, "");
                  const result = await uploadFiletoS3(base64Data).then(async (res)=>{
                    console.log("result is ", res);
                    link = res;
                    console.log("updated image :", link);
                    setPost((prev)=>{
                        return {...prev, title, content: content, category, image: link}
                    })
                    await updatePost(slug, {
                        ...postInfo,
                        image: link
                    });
                  })
                }
                reader.readAsDataURL(image); 
                
            }
        setLoading(false);
            
    };

    useEffect(()=>{
        getCategoriesBD();
    },[])

    if(loading){
        return <Loading />
    }

  return (
    <>
    {changeState && <form onSubmit={changePost} action="#" className={Styles.postForm}>
    <input 
                onChange={(e) => setImage(e.target.files[0])} 
                type="file" 
                name="image" 
                id="image" 
            />
            <select onChange={(e)=>setCategoryId(e.target.value)} value={categoryId} name="category" id="">
                {
                   categories.length > 1 && categories?.map((category)=>{
                        return <option value={category?.id}>{category?.name}</option>
                    })
                }
            </select>
            <input className={Styles.postTitleForm} onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='title' />
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Edit...' name="" id=""></textarea>
            <button>Change</button>
        </form>}
        </>
  )
}

export default edit