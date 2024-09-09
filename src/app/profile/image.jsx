"use client"
import React, { useState } from 'react'
import Styles from "./profile.module.css"
import Image from 'next/image'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "../../lib/firebase.ts"
import { v4 } from "uuid";
import { addImage } from '@/lib/auth';
import { getUser } from '@/lib/user';


const image = ({setUser, user}) => {
    const [url, setUrl] = useState("");
    const [err, setErr] = useState(false)
    const submit = async(e) =>{
        e.preventDefault();
        setErr(false);
        let localStorageUser = await getUser();
        setUser(localStorageUser);
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        if(!data.image.size) {
            setErr(true);
            return;
        }
        let imageId=v4();
        const storageRef = ref(storage, 'users/'+ imageId + '.jpg');
        await uploadBytes(storageRef, data.image).then((snapshot) => {
            getDownloadURL(ref(storage, 'users/'+ imageId + '.jpg'))
            .then((link)=>{
                setUrl(link.toString());
                addImage({
                    email: localStorageUser.email,
                    image: url
                  }).then(async(res)=>{
                    let newUser = await JSON.stringify(res);
                    localStorage.setItem("user", newUser);
                    setUser(res);
                  })
            })
          });
    }
  return (
    <>
    <form onSubmit={submit}>
        {err && <h3 className={Styles.error}>Upload image first!!!</h3>}
        <Image className={Styles.profilePic}
                    src={url || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"}
                    width={150}
                    height={150}
                    alt='profile'
                />
        <input style={{display: "none"}} id="img-upload" type="file" name="image" />
                <label className={Styles.imageUploader} for="img-upload">
                  Upload image
                </label>
        <button className={Styles.imageUploaderBtn} type="submit">Change Image</button>
    </form>
    </>
  )
}

export default image