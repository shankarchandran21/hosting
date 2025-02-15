import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    idToken: String,
    uid: {
        type:String,
        required:true,
        unique:true,
    },
    displayName:{
        type:String,
        required:true,
    },
    photoURL: {
        type:String,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    }
})

const User = mongoose.model("USer",userSchema)

export default User