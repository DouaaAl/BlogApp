import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Styles from "./navbar.module.css";
import Links from "./links.jsx"
const navbar = () => {


  return (
    <>
    <header className={Styles.header}>
      <div className={Styles.icons}>
        <Link href="/">
          <Image
            src="/socials/facebook.png"
            width={30}
            height={30}
            alt='facebook link'
          />        
        </Link>

        <Link href="/">
          <Image
            src="/socials/instagram.png"
            width={30}
            height={30}
            alt='instagram link'
          />        
        </Link>

        <Link href="/">
          <Image
            src="/socials/linkdin.png"
            width={30}
            height={30}
            alt='linkdin link'
          />        
        </Link>

        <Link href="/">
          <Image
            src="/socials/twitter.png"
            width={30}
            height={30}
            alt='twitter link'
          />        
        </Link>


      </div>
      <a href="/"><h1>LOGO</h1></a>
      <Links />
    </header>
    <nav className={Styles.navbar}>
      <Link href="/">
        Home
      </Link>
      <Link href="/posts">
        Posts
      </Link>
      <Link href="/myposts">
        My Posts
      </Link>
      <Link href="/create">
        Create Post
      </Link>
    </nav>
    </>

  )
}

export default navbar