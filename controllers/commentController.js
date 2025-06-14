//import models
const Post = require("../models/postModel");
const Comment = require("../models/commentModel")

exports.createComment = async(req,res) => {
    try{
        //fetch data from req body
        const {post,user,body} = req.body;
        //create a commment object
        const comment = new Comment({
            post,user,body
        });
        //save comment
        const savedComment = await comment.save();

        //find the post using id
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments: savedComment._id}},{new:true})
                            .populate("comments")
                            .exec();

        res.json({
            post:updatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error: "Error while Creating comment",
        });
    }
}