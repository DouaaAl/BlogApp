"use server"
import email from 'next-auth/providers/email';
import { db } from './db';
import { hashPassword, verifyPassword } from './auth';



export const updateName = async(data: any) =>{
    const oldUser = await db.user.findFirst({
        where:{
            email: data.email
        }
    })
    if(!oldUser){
        return {
            message: "user doesn't exist",
            err: true
        }
    }
    else{
         let isPassword = await verifyPassword(data.password, oldUser.password)
         if(!isPassword){
            return {
                message: "Wrong password",
                err: true
            }
         }
        const user = await db.user.update({
            where: {
                email: data.email
            },
            data: {
                fullname: data.name
            }
            })       
            return await JSON.stringify({
            name : user.fullname,
            admin: user.admin,
            email: user.email,
            image: user.image
            });
    }

}

export const updateEmail = async(data: any) =>{
    const oldUser = await db.user.findFirst({
        where:{
            email: data.email
        }
    })
    if(!oldUser){
        return {
            message: "user doesn't exist",
            err: true
        }
    }
    else{
    const user = await db.user.update({
        where: {
            id: oldUser.id
        },
        data: {
            email: data.newemail
        }
    })
    return await JSON.stringify({
        name : user.fullname,
        admin: user.admin,
        email: user.email,
        image: user.image
    });
    }
}

export const updatePassword = async(data: any) =>{
    const oldUser = await db.user.findFirst({
        where:{
            email: data.email
        }
    })
    if(!oldUser){
        return {
            message: "user doesn't exist",
            err: true
        }
    }
    else {
        let newpassword = await hashPassword(data.newpassword);
        const user = await db.user.update({
            where: {
                id: oldUser.id
            },
            data: {
                password: newpassword
            }
        })

        return {
            message: "Password Changed",
            state: true
        }
    }
}