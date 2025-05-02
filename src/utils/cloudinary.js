const cloudinary=require('cloudinary').v2
const fs=require('fs')

//Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Upload an imagae
const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null

        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
          }

        return response;
    }catch(e){
        console.error("Cloudinary upload failed", e)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }
        return null;
    }
}

module.exports=uploadOnCloudinary;