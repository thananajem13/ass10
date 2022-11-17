import { postModel } from "../../../../DB/models/post.model.js"
import { userModel } from "../../../../DB/models/user.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";
// import {qrCodeGeneration} from '../../user/controller/user.js'
export const addPost = async (req, res) => {
     try {
           const CreatedBy = req.user._id
    let savedPost = {}
    let url = ""
    let count = 0
    if (!req.body.postBody) {
        return res.json({ message: "Please enter post body" })
    } else {
        const post = new postModel({ postBody: req.body.postBody, CreatedBy })
        savedPost = await post.save()
        console.log({ id: savedPost._id });
        if (savedPost) {
            const postID = savedPost._id
            const updateUserPosts = await userModel.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { postsID: postID } })
        // qrCodeGeneration(updateUserPosts,req.user._id)

            count++
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
                    folder: `user/profilePic/${req.user._id}`
                })
                const updateProfilePic = await postModel.updateOne({ _id: postID }, { postPicture: secure_url })
                if (updateProfilePic.modifiedCount) {
                    url = secure_url
                    count++
                } else {
                    count--
                }

            }
        }
        else {
            count--
        }

    }
    console.log({ count });

    if (count != 2 && req.file) {
        return res.status(400).json({ message: "failed to upload file" })
    } else if (count != 1 && count != 2 && req.body.postBody) {
        return res.status(400).json({ message: "failed to save postBody or you don't add it to body" })
    }
    else if (count > 0) {
        return res.status(201).json({ message: "Done", url, savedPost })

    }

     } catch (error) {
    return res.status(500).json({ message: "error", error })
        
     }
 

}
export const editPost = async (req,res)=>{
    try {
        const {id} = req.params
    const {_id} = req.user
    const {postBody} = req.body
    const post = await postModel.findOneAndUpdate({CreatedBy:_id,isDeleted:false,_id:id},{postBody},{new:true})
    if(!post){
        return res.status(400).json({message:"invalid post id or you aren't owner's of post or post deleted, so you cn't update this post"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
    

}
export const deletePost = async (req,res)=>{
    try {
         const {id} = req.params
    const {_id} = req.user 
    const post = await postModel.findOneAndUpdate({CreatedBy:_id,isDeleted:false,_id:id},{isDeleted:true},{new:true})
    if(!post){
        return res.status(400).json({message:"invalid post id or you aren't owner's of post or post deleted, so you cn't delete this post"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
   

}
export const likePost = async(req,res)=>{
    try {
         const {id} = req.params
    const {_id} = req.user
    const post = await postModel.findOneAndUpdate({_id:id,isDeleted:false,likes: {$nin: [_id]}},{$addToSet:{likes:_id}},{new:true})
    console.log({post})
    if(!post){
        return res.status(400).json({message:"invalid post id  or you liked post previously"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
   
}
export const unLikePost = async(req,res)=>{
    try {
         const {id} = req.params
    const {_id} = req.user
    const post = await postModel.findOneAndUpdate({_id:id,isDeleted:false,likes: {$in: [_id]}},{$pull:{likes:_id}},{new:true})
    console.log({post})
    if(!post){
        return res.status(400).json({message:"invalid post id  or you un liked post previously to remove it"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
   
}
export const getPostsOfUser = async(req,res)=>{
    try {
        let { page, size } = req.params
    if (!page || isNaN(page)) {
        page = 1
    }
    if (!size || isNaN(size)) {
        size = 2
    }
    const { limit, skip } = paginate(page, size)
    const {id}= req.params
    const post = await postModel.find({CreatedBy:id,isDeleted:false}).populate('CreatedBy').skip(skip).limit(limit)
    if(!post){
        return res.status(400).json({message:"invalid user id"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
    
}
export const getPostsOfUserOwner = async(req,res)=>{
    try {
        let { page, size } = req.params
    if (!page || isNaN(page)) {
        page = 1
    }
    if (!size || isNaN(size)) {
        size = 2
    }
    const { limit, skip } = paginate(page, size) 
    const post = await postModel.find({isDeleted:false}).populate('CreatedBy').skip(skip).limit(limit)
    if(!post){
        return res.status(400).json({message:"invalid user id"})
    }
    return res.status(200).json({message:"Done",post})
    } catch (error) {
    return res.status(500).json({ message: "error", error })
        
    }
    
}