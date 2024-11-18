import mongoose from "mongoose";

const convoSchema = new mongoose.Schema({
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        }
    ], 
    messages: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Messages',
            default: [],
        }
    ]
}, 

{timestamps: true})

const conversation = mongoose.model("conversation", convoSchema)

export default conversation