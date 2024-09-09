"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/navbar.jsx'
import Footer from "@/components/footer/footer.jsx"
import Postspage from "@/components/allposts/posts.jsx"
import Styles from "./page.module.css"
import { getCategories } from '@/lib/create'
import {getAllPostSkip} from "@/lib/filterPost.ts"
import Loading from '@/components/loading/loading'


const page = () => {
  const [filter, setFilter] = useState({
    categoryId: "",
    sortType: ""
  })
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState([
    'Popular',
    'Featured',
    'New'
  ])
  const [selectCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSortType, setSelectedSortType] = useState("")
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect
  useEffect(()=>{
    const getAllPosts =async ()=>{
      setLoading(true);
       let data = await getAllPostSkip(skip, filter.categoryId, filter.sortType);
       if (filter.sortType == 'Popular'){
        data = data.sort((a, b) => {
          let sumA = a.likes + a.dislikes;
          let sumB = b.likes + b.dislikes;
          return sumB - sumA;
        });
       }
      setLoading(false);
      setPosts(data);
    }
    getAllPosts();
  }, [filter, skip])

  const selectCategory= (e) =>{
    if(e.target.textContent == "All"){
      setSelectedCategoryId("all");
      setFilter((prev)=>{
        return {...prev, categoryId: ""}
      })
    }
    else{
      setSelectedCategoryId(e.target.dataset.id);
      setFilter((prev)=>{
        return {...prev, categoryId: e.target.dataset.id}
      })
    }
    
  }

  const selectSort = (e)=>{
    if(e.target.textContent == "All"){
      setSelectedSortType("all");
      setFilter((prev)=>{
        return {...prev, sortType: ""}
      })
    }
    else{
      setSelectedSortType(e.target.textContent);
      setFilter((prev)=>{
        return {...prev, sortType: e.target.textContent}
      })
    }
  }

  useEffect(()=>{
    const categoriesFunc = async() =>{
      const getAllCategories = await getCategories();
      setCategories(getAllCategories);
    }
    categoriesFunc();
  },[])


  if (loading){
    return <Loading />
  }

  return (
    <>
    <Navbar />
    <main className={Styles.main}>
    <article className={Styles.sidebar}>
      <h1 className={Styles.title}>Filters</h1>
      <div className="filter">
        <h3 className={Styles.subTitle}>Categories</h3>
        <div  onClick={selectCategory} className={Styles.categories}>
          <span className={("all" == selectCategoryId) ? Styles.selected : ''} data-id={0}>All</span>
          {
            categories?.map((cat)=>{
              return <span className={(cat.id == selectCategoryId) ? Styles.selected : ''} data-id={cat.id}>{cat.name}</span>
            })
          }
        </div>
        <h3 className={Styles.subTitle}>Sorting</h3>
        <div onClick={selectSort} className={Styles.categories}>
        <span className={"all" == selectedSortType ? Styles.selected: ''}>
                All
              </span>
          {
            sortType.map(sort=>{
              return <span className={sort == selectedSortType ? Styles.selected: ''}>
                {sort}
              </span>
            })
          }
        </div>
      </div>
    </article>
      <div>
        <Postspage setSkip={setSkip} skip={skip} posts={posts} filter={filter} />
      </div>
    </main>
    <Footer />
    </>
  )
}

export default page