import mongoose from "mongoose";

const createSchema = mongoose.Schema({
    user:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created_Date: {
        type: Date
    },
    liked:{
        type:Boolean,
    },
    comments:[
        {
            comment:{type:String,},
            createdAt:{type: Date,default:Date.now,},
        }
    ],
    
})
export const create = mongoose.model('create',createSchema)