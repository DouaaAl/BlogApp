import React from 'react'
import Styles from "./footer.module.css"
import Link from 'next/link'

const footer = () => {
  return (
    <footer className={Styles.footer}>
        <h1 className={Styles.logo}>LOGO</h1>
        <ul className={Styles.links}>
          <li>
            <Link href="#">Restaurants</Link>
          </li>
          <li>
            <Link href="#">Food</Link>
          </li>  
          <li>
            <Link href="#">Drinks</Link>
          </li>        
        </ul>
        <div className={Styles.line}></div>
        <p className={Styles.copyright}>
        Copyright © 2024 Douaa El Mahraoui
        </p>
    </footer>
  )
}

export default footer