"use server"

import { db } from "./db"

export const getAllPostSkip = async(skip: any, categoryId:any, sort:any) =>{
    let filter = {
        
    }
    let orderBy = {}
    if(categoryId) {
        filter = {...filter, categoryId}
    }
    if (sort == 'Featured'){
        filter = {...filter, featured: true}
    }
    else if (sort == 'New'){
        orderBy = {
                createdAt: 'asc',
            }
    }
    const posts = await db.post.findMany({
            where:filter,
            skip,
            orderBy,
            take: 3
    })
    return posts

}

export const getPostByInfo = async(title: any, categoryId: any) =>{
    let posts;
    if(categoryId){
        posts = await db.post.findMany({
            where:{
                title:{
                    startsWith: title
                },
                categoryId: categoryId || ""
            }
        })
    }
    else{
        posts = await db.post.findMany({
            where:{
                title:{
                    startsWith: title
                }
            }
        })
    }
    return posts
}