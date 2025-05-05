import { Schema, model } from "mongoose";

const clientSchema = Schema({
    name: {
        type: String,
        required: [true, "Client name is required"],
        maxLength: [60, "Name cannot exceed 60 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

clientSchema.methods.toJSON = function () {
    const { _id, ...clientDb } = this.toObject();
    clientDb.cid = _id;
    return clientDb;
};

export default model("Client", clientSchema);
