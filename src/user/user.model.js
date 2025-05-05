import { Schema, model } from "mongoose";

const userSchema = Schema({
    completeName: {
        type: String,
        required: [true, "complete name is needed for your account"],
        maxLength: [60, "Name cannot exceed 60 characters"]
    },
    email: {
        type: String,
        required: [true, "An email is required for your account"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is required for your account"]
    },
    role: {
        type: String,
        enum: ["ADMINISTRATOR", "EMPLOYEE"],
        default: "EMPLOYEE"
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

userSchema.methods.toJSON = function () {
    const { password, _id, ...userDb } = this.toObject();
    userDb.uid = _id;
    return userDb;
};

export default model("User", userSchema);
