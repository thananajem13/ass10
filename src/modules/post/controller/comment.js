import mongoose from "mongoose";
import { commentModel } from "../../../../DB/models/comment.model.js";
import { postModel } from "../../../../DB/models/post.model.js"; 

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentBody } = req.body;
    const CreatedBy = req.user._id;
    const post = await postModel.findOne({ _id: postId, isDeleted: false });

    if (!post) {
      return res.status(400).json({ message: "invalid post id or deleted post" });
    }
    const comment = new commentModel({ commentBody, postId, CreatedBy });
    const savedComment = await comment.save();
    if (!savedComment) {
      return res
        .status(400)
        .json({ message: "failed to save or invalid post id" });
    }

    const commentID = savedComment._id;
    if (!req.params.commentReplyTo) {
      const addCommentToPost = await postModel
        .findByIdAndUpdate(
          { _id: postId, isDeleted: false },
          { $addToSet: { comments: commentID } },
          { new: true }
        )
        .populate("CreatedBy comments");
      if (!addCommentToPost) {
        return res
          .status(400)
          .json({ message: "failed to add comment to post or invalid post id" });
      }
      return res.status(201).json({ message: "Done", addCommentToPost });
    } else {
      console.log({
        commentID,
        commentReplyToID: mongoose.Types.ObjectId(req.params.commentReplyTo),
      });
      const checkIfCommentReplyToExist = await commentModel.findOne({
        isDeleted: false,
        _id: req.params.commentReplyTo,
      }); 
      if (!checkIfCommentReplyToExist) {
        return res
          .status(400)
          .json({ message: "comment try to reply to doesn't exist" });
      }
      const addCommentReplyTo = await commentModel.findByIdAndUpdate(
        { _id: commentID, isDeleted: false },
        { commentReplyTo: mongoose.Types.ObjectId(req.params.commentReplyTo) },
        { new: true }
      );
      console.log({addCommentReplyTo});
      if (!addCommentReplyTo) {
        return res.status(400).json({
          message:
            "failed to add replied comment to it's parent comment or comment which you want to add to it is  deleted ",
        });
      }
      return res.status(201).json({ message: "Done", addCommentReplyTo });
    }
  } catch (error) {
    return res.status(500).json({ message: "error", error })

  }

}
export const editComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { _id } = req.user;
    const { commentBody } = req.body;
    const updateComment = await commentModel.findByIdAndUpdate(
      { _id: commentID, CreatedBy: _id, isDeleted: false },
      { commentBody },
      { new: true }
    );
    updateComment
      ? res.status(200).json({ message: "Done", comment: updateComment })
      : res.status(400).json({
        message:
          "invalid comment id or you are not comment's owner or comment is deleted",
        comment: updateComment,
      });
  } catch (error) {
    return res.status(500).json({ message: "error", error })

  }

};
export const softDeleteComment = async (req, res) => {
  try {
    const { commentID } = req.params;
    const { _id } = req.user;
    const commentFind = await commentModel.findOne({
      _id: commentID,
      isDeleted: false,
      CreatedBy:_id
    });
    const postowner = await postModel.findOne({_id:commentFind.postId,isDeleted: false,})//or populate
const replies = await commentModel.find({commentReplyTo:commentID, isDeleted: false })
    
if(!postowner || !commentFind ){
      return res.status(400).json({ message: "post may be deleted, so you can't delete any comment. it's deleted... or comment deleted previously, so it isn't exist" });

    } 
    //delete all child comment
    recursivePopulateReplies(commentFind)
    const deleteMainComment  = await commentModel.findOneAndUpdate(
      {_id:commentID, isDeleted: false },
      { isDeleted: true, deletedBy: _id },
      { new: true })
     
      if ( deleteMainComment) {

        return res.status(200).json({ message: "Done",  deleteMainComment  });
      }else{
        return res.status(400).json({ message: "failed",  deleteMainComment  });

      }  
    
  } 
     catch (error) {
    return res.status(500).json({ message: "error", error })

  }

};
const recursivePopulateReplies = async (
  comment,
  parents = new Set(),
  maxDepth = 3
) => {
  if (parents.has(comment._id)) return;
  parents.add(comment._id);

  comment.replies = await commentModel
      .find({  commentReplyTo: comment._id })
      .lean(); 
     
      

  if (comment.replies.length === 0)  
    return;
  
 
  return await Promise.all(
      comment.replies.map(async (c) => {
        await commentModel.findByIdAndUpdate({_id:c._id},{isDeleted:true})
        recursivePopulateReplies(c, parents, maxDepth - 1)
      }  
      )
      
  );
};
export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const commentLike = await commentModel.findOneAndUpdate(
      { _id: id, isDeleted: false, likes: { $nin: [_id] } },
      { $addToSet: { likes: _id } },
      { new: true }
    );
    console.log({ commentLike });
    if (!commentLike) {
      return res
        .status(400)
        .json({ message: "invalid comment id  or you liked post previously" });
    }
    return res.status(200).json({ message: "Done", post });

  } catch (error) {
    return res.status(500).json({ message: "error", error })

  }

};

export const getComment = async(req,res)=>{
  const {id} = req.params
  const comment = await commentModel.findOne({_id:id,isDeleted:false}).populate([{
      path:"CreatedBy"
  },{
      path:"postId",
      populate:[{
          path:"CreatedBy"
      }]
  }])
  if(!comment){
      return res.status(400).json({message:"invalid id or comment is deleted"})
  }
  return res.status(400).json({message:"Done",comment})
}
