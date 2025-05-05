import { Schema, model } from "mongoose";

const movementSchema = new Schema({
    move: {
        type: String,
        enum: ["ENTRY", "EXIT"],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    reason: {
        type: String,
        required: function () {
            return this.move === "EXIT";
        }
    },
    destination: {
        type: String,
        required: function () {
            return this.move === "EXIT";
        }
    }
},
    {
        versionKey: false,
        timestamps: true
    });

export default model("Movement", movementSchema);
