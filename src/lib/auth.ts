"use server"
import { db } from './db';
const bcrypt = require('bcrypt');
const saltRounds = 10;


export const hashPassword= async(password: String)=>{
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
      }
}

export const verifyPassword = async(plainTextPassword : string, hashedPassword : string) => {
    try {
      const match = await bcrypt.compare(plainTextPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }
  


export const createUser = async (formData: any) => {
    "use server"
    try{
        if(typeof formData !== 'object' || formData === null){
            throw new Error("Invalid data format")
        }
        const user = await db.user.findMany({
            where: {
                email: formData.email
            }
        })
        if (user.length >= 1){
            return {message: "user exists", user}
        }
        let password = await hashPassword(formData?.password);
        password = password.toString()
        const newUser = await db.user.create({
            data: {
                fullname: formData?.fullname,
                email: formData?.email || "",
                image: "",
                password: password
            }
        })
        return {success: true};
    } catch(err){
        throw err
    }

};

export const loginUser = async(formData: any) =>{
    const user = await db.user.findMany({
        where: {
            email: formData.email
        }
    })
    if(user.length <1){
        return {message: "User Doesn't exist", err: true}
    }
    let comparePass = await verifyPassword(formData.password, user[0].password);
    if(!comparePass){
        return {message: "Wrong password", err: true}
    }

    return {message: "Logged In", err: false, user: JSON.stringify({
        name: user[0].fullname,
        admin: user[0].admin,
        email: user[0].email,
        image: user[0].image
    })}
}

export const addImage = async(data: any)=>{
    let user = await db.user.update({
        where: {
            email: data.email
        },
        data: {
            image: data.image
        }
    })
    return user;
}

