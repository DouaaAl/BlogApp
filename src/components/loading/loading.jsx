import React from 'react'
import Styles from "./loading.module.css"
import Image from 'next/image'

const loading = () => {
  return (
    <section className={Styles.loading}>
        <Image
            src="/loading.png"
            height={100}
            width={100}
            alt='loading'
        />
    </section>
  )
}

export default loading