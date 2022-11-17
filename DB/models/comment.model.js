import { Schema, model,Types } from 'mongoose'

const commentSchema = new Schema({
    commentBody: { type: String, required: true },
    postId: { type: Types.ObjectId, required: true,ref:'Post' },
    CreatedBy: { type: Types.ObjectId, required: true,ref:'User' },
    isDeleted: { type: Boolean, default:false },
    likes:[{type:Types.ObjectId}],  
    deletedBy: { type: Types.ObjectId,ref:'User' },
    commentReplyTo:{type: Types.ObjectId,  ref:'Comment',default:null}
}, {
    timestamps: true
}) 
export const commentModel  =  model('Comment', commentSchema)