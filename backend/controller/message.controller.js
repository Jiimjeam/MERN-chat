import conversation from '../models/convo.model.js'
import Message from '../models/message.model.js'


export const sendMessage = async (req, res) => { 
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id 

        let Conversation = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!Conversation){  
            Conversation = await conversation.create({
                participants: [senderId, receiverId]
            })
        }
 
        const newMessage = new Message({
            senderId,
            receiverId, 
            message,
        })

        if (newMessage){
            Conversation.messages.push(newMessage._id)
        }


        //Socket.io functions here. Later


        //optimize version 
        await Promise.all([Conversation.save(), newMessage.save()])

        res.status(201).json(newMessage); 


    } catch (error) {
        console.log("error in message.Controller sendMessage controller", error.message)
        res.status(500).json({error: "Internal Server error"});
    }
}

export const getMessages = async (req, res) => { 
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const Conversation = await conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        res.status(200).json(Conversation.messages)

    } catch (error) {
        console.log("error in message.Controller getMessage controller", error.message)
        res.status(500).json({error: "Internal Server error"});
    }
}