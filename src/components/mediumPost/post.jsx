import React from 'react'
import Styles from "./post.module.css"
import Image from 'next/image'
import Link from 'next/link'

const post = ({src, category, desc, slug}) => {
  return (
    <article className={Styles.post}>
        <Image
        src={src}
        width={800}
        height={400}
        alt='image'
        />
        <span className={Styles.category}>{category}</span>
        <p className={Styles.desc}>
            {desc}
        </p>
        <Link href={`/post/${slug}`}>        
        <button className={Styles.btn}>
            READ MORE
        </button>
        </Link>
    </article>
  )
}

export default post