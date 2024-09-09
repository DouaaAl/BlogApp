import React, {useEffect, useState} from 'react'
import Styles from "./categories.module.css"
import Row from "./row.jsx"
import { findCategory, createCategoryInfo } from '@/lib/dashboard.ts';
import Loading from '@/components/loading/loading';

const categories = () => {

    const [categoryName, setCategoryName] = useState("");
    const [currentCategories, setCurrentCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCurrentCategories = async(doloading=true) =>{
        if(doloading){
            setLoading(true);
        }
        const data = await findCategory(categoryName);
        setCurrentCategories(data);
        setLoading(false);
    }

    const addCurrentCategory = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const newCategory = await createCategoryInfo(categoryName);
        await getCurrentCategories();
        setLoading(false);
    }


    useEffect(()=>{
        getCurrentCategories(false);
    }, [categoryName])

    if(loading){
        return <Loading />
    }
  return (
    <section className={Styles.categories}>
        <h1 className={Styles.title}>Categories</h1>
        <form onSubmit={addCurrentCategory} className={Styles.addCategory} action="">
            <input value={categoryName} onChange={(e)=>{
                setCategoryName(e.target.value);
            }} type="text" placeholder='Name...' />
            <button>Add Category</button>
        </form>
        <ul className={Styles.list}>
            <li>
                <div>
                    <h3>Name</h3>
                    <h3>Admin</h3>
                </div>
                <div>
                </div>
            </li>
            {currentCategories.map((cat)=>{
                return <Row getCurrentCategories={getCurrentCategories} id={cat.id} name={cat.name} />
            })}
            
        </ul>
    </section>
  )
}

export default categories