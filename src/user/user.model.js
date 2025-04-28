import { Schema, model } from "mongoose";

const userSchema = Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [150, "Only less than 25 characters"]
    },
    email: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "EMPLOYEE"],
        default: "EMPLOYEE"
    },
    status: {
        type: Boolean,
        default: true
    }
});

userSchema.methods.toJSON = function() {
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default model("User", userSchema);