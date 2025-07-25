import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,    
    },
    password: {
        type: String,
        required: true,    
    },    
    isAdmin: {
        type: Boolean,
        default: false,    
    },
    cartData: {
        type: Object,
        default: {},
    }
},{ timestamps: true})

const userModel = mongoose.model.user || mongoose.model('user', userSchema)

export default userModel