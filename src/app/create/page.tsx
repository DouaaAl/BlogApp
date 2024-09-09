"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Styles from "./create.module.css";
import { findCategories, createPost } from "@/lib/post";
import { getUser } from "@/lib/user";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
import { uploadFiletoS3 } from "@/lib/image";

interface User {
  email: string;
}

const Create: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      let data = await findCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData.entries());
    let user = getUser() as User | string; // Explicitly type `user`

    if (typeof user === 'string') {
      console.error('User is a string, cannot access email');
      setLoading(false);
      return;
    }

    let uuid = v4();

    if (file) {
      const reader = new FileReader();
      let link = "";
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String?.replace(/^data:image\/[a-z]+;base64,/, "");
        const result = await uploadFiletoS3(base64Data);
        link = result;

        data = { ...data, email: user.email, uuid: uuid, image: link, published: published as unknown as FormDataEntryValue };
        data = JSON.parse(JSON.stringify(data));
        setLoading(true);
        await createPost(data);
        setLoading(false);
        router.push(`/post/${uuid}`);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <form onSubmit={submit} className={Styles.createPost}>
        <input
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          name="image"
          id="file"
          type="file"
        />
        <label className={Styles.file} htmlFor="file">
          Upload Image
        </label>
        <select name="category">
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input name="title" type="text" placeholder="Title..." />
        <textarea name="content" placeholder="Write New Text..." />
        <div className={Styles.btns}>
          <button type="submit" onClick={() => setPublished(true)}>
            Post
          </button>
          <button type="submit" onClick={() => setPublished(false)}>
            Save Later
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Create;