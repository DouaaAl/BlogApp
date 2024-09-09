import React, {useEffect, useState} from 'react'
import Styles from "./post.module.css";
import Image from 'next/image';
import { getCategoryById } from '@/lib/create';
import Link from 'next/link';

const post = ({src, category, title, text, slug}) => {

  const [categoryName, setCategoryName] = useState("");

  const getCurrentCategoryName = async()=>{
    const data = await getCategoryById(category);
    setCategoryName(data);
  }

  useEffect(()=>{
    getCurrentCategoryName();
  }, [])

  return (
    <div className={Styles.post}>
    <Image
    src={src}
    width={280}
    height={270}
    alt='image'
    />
    <h3>{categoryName}</h3>
    <h1>{title}</h1>
    <p>{text}</p>
    <Link href={`/post/${slug}`}>
      <button>Read More</button>
    </Link>
</div>
  )
}

export default post