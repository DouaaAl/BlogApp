"use server"
import email from "@/app/profile/email";
import { db } from "./db"
import { connect } from "http2";

export const findCategories = async () =>{
    let categories = await db.category.findMany({});
    return categories;
}

export const createPost = async (data: any) =>{ 
    let user = await db.user.findUnique({
        where: {
            email: data.email
        }
    })
    let authorId = user?.id;
    let categoryId = data.category;
    let title = data.title;
    let content = data.content;
    let slug = data.uuid;
    let image = data.image;
    let published = data.published;
    let post = {
        title,
        image: image,
        content,
        slug,
        published,
        featured: false,
        author: {
            connect: {
                id: authorId
            }
        },
        categoryPost: {
            connect:{
                id: categoryId
            }
        }
    };
    let newpost = await db.post.create({
        data: post
    });
    return newpost;
}