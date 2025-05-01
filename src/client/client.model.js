import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre del cliente es obligatorio"]
    },
    contact: {
        type: String,
        required: [true, "El contacto del cliente es obligatorio"]
    },
    company: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model("Client", clientSchema);
