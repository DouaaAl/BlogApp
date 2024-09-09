import React, {useState} from 'react'
import Styles from "./categories.module.css"
import Image from 'next/image'
import {  deleteCategory, updateCategoryName } from '@/lib/dashboard.ts';
import Loading from '@/components/loading/loading';


const row = ({id, name, getCurrentCategories}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [newCategory, setNewCategory] = useState(name);
    const [loading, setLoading] = useState(false);

    const editCategory = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if (newCategory == name || newCategory == ''){
            const data = await updateCategoryName(id, name);
        }
        else {
            const data = await updateCategoryName(id, newCategory);
        }
        await getCurrentCategories();
        setIsEdit(false);
        setLoading(false);
    }

    const deleteCurrentCategory = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const data = await deleteCategory(id);
        await getCurrentCategories();
        setLoading(false);
    }

    if(loading){
        return <Loading />
    }

  return (
    <li>
        {!isEdit &&  <div>
        <h3>{name}</h3>
        <h3>
        <Image
                onClick={(e)=>setIsEdit(true)}
                src="/dashboard/edit.png"
                width={30}
                height={30}
                alt='edit'
            />
            <Image
                onClick={deleteCurrentCategory}
                src="/dashboard/delete.png"
                width={30}
                height={30}
                alt='delete'
            />
        </h3>                    
    </div>}
    {isEdit && <form onSubmit={editCategory} action="">
        <input value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} placeholder='Name...' type="text" />
        <button>Submit</button>
    </form>}
    
</li>
  )
}

export default row