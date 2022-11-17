import cloudinary from "./cloudinary";

const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `Gallary/${req.user._id}` })