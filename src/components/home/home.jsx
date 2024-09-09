import React from 'react'
import Styles from "./home.module.css"
import Featured from "../featuredPosts/featured"
import Popular from "../popularPosts/popular.jsx"
import Newset from "../newposts/new.jsx"

const Main = () => {

  return (
    <>
        <main className={Styles.main}>
            <article>
                <span>
                    BEST BLOG FOR RESTAURANTS, DRINKS AND FOOD REVIEWS
                </span>
                <h1>
                Join our 100,000+ Subscribers List Today!
                </h1>
                <form className={Styles.form} action="#">
                    <input type="text" placeholder='email address' />
                    <button>Subscribe now</button>
                </form>
            </article>
        </main>
        <Featured />
        <Popular />
        <Newset />
    </>
  )
}

export default Main