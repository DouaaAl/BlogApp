"use server"

import { db } from "./db"

// search functions
export const getUsersWithInfo = async(fullname: any, email: any) =>{
    const users = await db.user.findMany({
        where:{
            fullname: {
                startsWith: fullname
            },
            email: {
                startsWith: email
            }
        }
    })
    return users;
}

export const getPostWithInfo = async(title: any, email: any, fullname: any, categoryName: any) =>{
    const category = await db.category.findFirst({
        where: {
            name: categoryName
        }
    });
    const user = await db.user.findFirst({
        where:{
            email: email,
            fullname: fullname
        }
    })
    const posts = await db.post.findMany({
        where:{
            title: {
                startsWith: title
            },
            authorId: user?.id,
            categoryId: category?.id
        }
    })
    return posts;
}

export const getCommentInfo = async(fullname: any, title: any) =>{
    let comments;

    const posts = await db.post.findMany({
        where:{
            title:{
                startsWith: title
            }
        }
    })

    const postIds = posts.map(item=>{
        return item.id
    })

    if(postIds.length > 0){
        comments = await db.comment.findMany({
            where:{
                fullname: {
                    startsWith: fullname
                },
                postId: {
                    in: postIds
                }
            }
            });
        return comments
    }
    comments = await db.comment.findMany({
        where:{
            fullname: {
                startsWith: fullname
            }
        }
    });

    return comments;
}

export const findCategory = async(name: any) =>{
    const categories = await db.category.findMany({
        where: {
            name: {
                startsWith: name
            }
        }
    })
    return categories;
}

// delete functions
export const deleteUser = async(email:any) =>{
    if(email){
        const user = await db.user.delete({
            where: {
                email
            }
        })
        return user;
    }
}

export const deletePost = async(id:any) =>{
    const comment = await db.comment.deleteMany({
        where:{
            postId: id
        }
    })
    const post = await db.post.delete({
        where:{
            id
        }
    })

    return post
}

export const deletePostsUser = async(authorId: any) =>{
    if(authorId){
        const posts = await db.post.findMany({
            where:{
                authorId
            }
        })

        if (posts.length >= 1){
            posts.forEach(async(post)=>{
                const comments = await db.comment.deleteMany({
                    where:{
                        postId: post.id
                    }
                })
            })
            const deletePosts = await db.post.deleteMany({
                where:{
                    authorId
                }
            })        
        }
    
        return posts;
    }
}

export const deleteComment = async(id:any)=>{
    if(id){
    const comment= await db.comment.delete({
        where:{
            id
        }
    })

    return comment
    }
}

export const deleteCategory = async(id:any) =>{
    const category = await db.category.delete({
        where:{
            id
        }
    })

    return category;
}



// create category 
export const createCategoryInfo = async(name: any) =>{
    const category = await db.category.create({
        data:{
            name
        }
    })

    return category
}

// edit category
export const updateCategoryName = async(id: any, name:any) =>{
    const category = await db.category.update({
        where: {
            id
        },
        data: {
            name
        }
    })
    return category;
}