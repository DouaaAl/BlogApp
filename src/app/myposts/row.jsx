import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Styles from "./myposts.module.css"

const row = ({title, image, slug}) => {
  return (
    <li>
    <h3>
      <Image className={Styles.postImg}
        src={image}
        width={120}
        height={100}
        alt='featured'
      />
    </h3>
    <h3>{title}</h3>
    <h3>
      <Link href={'/post/' + slug}>
        <Image className={Styles.eye}
              src="/dashboard/eye.png"
              width={50}
              height={50}
              alt='view'
            />
      </Link>
    </h3>
  </li>
  )
}

export default row