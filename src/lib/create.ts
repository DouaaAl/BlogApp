"use server"

import { db } from "./db";

export const getPost = async(slug: any) =>{
    const post = await db.post.findFirst({
        where: {
            slug: slug
        }
    })
    return post;
}

export const getCategoryById = async(id: any) =>{
    const category = await db.category.findFirst({
        where: {
            id: id
        }
    })

    return category?.name;
}

export const getUserById = async(id: any) =>{
    const user = await db.user.findFirst({
        where: {
            id: id
        }
    })
    return user;
}

export const getCategories = async()=>{
    const getCategories = await db.category.findMany({});
    return getCategories;
}

export const updatePost = async(slug: any,data: any) =>{
    const newPost = await db.post.update({
        where:{
            slug: slug
        },
        data
    })
    return newPost
}

export const createPostComment = async(data: any) =>{
    console.log("create data ", data);
    const createPost = await db.comment.create({
        data:   {
            fullname: data.fullname,
            image: data.image,
            content: data.content,
            commentPost: {
                connect:{
                    id: data.postId
                }
            },
        }
    })

    return createPost;
}

export const getPostId = async(slug: any)=>{
    const getPost = await db.post.findFirst({
        where:{
            slug: slug
        }
    })

    return getPost?.id;
}

export const getPostById = async(id: any) =>{
    console.log("this is slug", id)
    const getPost = await db.post.findFirst({
        where:{
            id
        }
    })
    return getPost;
}

export const getComments = async (postId: string) =>{
    console.log("this is postId", postId);
    const comments = await db.comment.findMany({
        where:{
            postId: postId
        }
    });
    return comments;
}

export const updateLikes = async(id:any, newLikes: any) =>{
    const comment = await db.comment.update({
        where:{
            id
        },
        data:{
            likes: newLikes
        }
    })
    return comment
}

export const updateDislikes = async(id:any, newDisLikes: any) =>{
    const comment = await db.comment.update({
        where:{
            id
        },
        data:{
            dislikes: newDisLikes
        }
    })
    return comment
}

export const deletePost = async(slug: any) =>{
    const post = await db.post.delete({
        where:{
            slug
        }
    })

    return post
}

export const publishingPost = async(slug: any) =>{
    const post = await db.post.update({
        where:{
            slug
        },
        data:{
            published: true
        }
    })
}