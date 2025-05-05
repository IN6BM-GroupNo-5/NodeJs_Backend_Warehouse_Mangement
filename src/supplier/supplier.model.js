import { Schema, model } from "mongoose";

const supplierSchema = Schema({
    name: {
        type: String,
        required: [true, "Supplier name is needed"],
        maxLength: [60, "Name cannot exceed 60 characters"]
    },
    contactEmail: {
        type: String,
        required: [true, "A contact email is needed for your supplier"],
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

supplierSchema.methods.toJSON = function () {
    const { __v, _id, ...supplierDb } = this.toObject();
    supplierDb.sid = _id;
    return supplierDb;
};

export default model("Supplier", supplierSchema);
