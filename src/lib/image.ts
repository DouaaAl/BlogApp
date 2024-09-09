"use server"
require('dotenv').config();

import sharp from 'sharp';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
      accessKeyId:process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    }
  })


export const uploadFiletoS3 = async (base64String: string) => {
    try {
    const buffer = Buffer.from(base64String, 'base64');
    let fileId = await uuidv4();

    const fileBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .resize(3000, 1200)
        .toBuffer();
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: fileId,
        Body: fileBuffer,
        ContentType: "image/jpg"
    }
  
    const command = new PutObjectCommand(params);
    let imageLink = '';
    try {
        const response = await s3Client.send(command);
        imageLink = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileId}`;
        console.log(response, "image link :", imageLink);
        return imageLink;
    } catch (error) {
        console.log(error);
    }
    return imageLink;
    } catch (error) {
      console.error('Error processing image with sharp:', error);
      throw error; 
    }
  };

