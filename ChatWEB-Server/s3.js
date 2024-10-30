import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId : process.env.ACCESS_KEY,
        secretAccessKey : process.env.SECRET_ACCESS_KEY
    }
});
const BUCKET = process.env.BUCKET;

export const uploadTOS3 = async ({ file, username }) => {
    const key = `${username}.image_${(Date.now()).toString()}.${file.mimetype.split('/')[1]}`;
    const command = new PutObjectCommand({
        Bucket : BUCKET,
        Key : key,
        Body : file.buffer,
        ContentType : file.mimetype
    });

    try{
        await s3.send(command);
        return {key};
    }
    catch(error){
        console.log(error);
        return {error}
    }
}

export const generateSignedUrl = async({ filename }) => {
    try{
        const command = new GetObjectCommand({
            Bucket : BUCKET,
            Key: filename
        })

        const preSignedUrl = await getSignedUrl(s3, command);

        return {preSignedUrl};
    }
    catch(error){
        console.log(error);
        return {error}
    }
}