
import cloudinary from 'cloudinary'
 
cloudinary.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
    secure:true
});

export default  cloudinary.v2