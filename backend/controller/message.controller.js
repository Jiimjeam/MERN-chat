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

        res.status(201).json(newMessage); 


    } catch (error) {
        console.log("error in message.Controller controller", error.message)
        res.status(500).json({error: "Internal Server error"});
    }
}