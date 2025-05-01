import { Schema, model } from "mongoose";

const providerSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre del proveedor es obligatorio"]
    },
    contact: {
        type: String,
        required: [true, "El contacto del proveedor es obligatorio"]
    },
    productsSupplied: {
        type: [String], 
        default: []
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model("Provider", providerSchema);
