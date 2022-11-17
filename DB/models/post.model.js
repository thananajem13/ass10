import { Schema, model,Types } from 'mongoose'

const postSchema = new Schema({
    postBody: { type: String, required: true },
    CreatedBy: { type: Types.ObjectId, required: true,ref:'User' },
    isDeleted:{type:Boolean,default:false},
    postPicture: String,
    likes:[{type:Types.ObjectId}],
    unLikes:[{type:Types.ObjectId}], 
    comments:[{ type: Types.ObjectId, default:null,ref:'Comment' }], 
}, {
    timestamps: true
})

export const postModel  =  model('Post', postSchema)