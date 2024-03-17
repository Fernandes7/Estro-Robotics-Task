import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{type:String},
    useremail:{type:String},
    userpassword:{type:String}
})

const UserSchema=mongoose.model("Userdata",userSchema)

export {UserSchema}