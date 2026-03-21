import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    lastActiveDate: {
        type: Date,
        default: () => new Date()
    }

});

const User = mongoose.model("User", UserSchema);

export default User;