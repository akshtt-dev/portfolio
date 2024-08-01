import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    });

const Message = mongoose.model("Message", messageSchema);

export default Message;