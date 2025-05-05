import { Schema, model } from "mongoose";

const productSchema = Schema({
    productName: {
        type: String,
        required: [true, "The product name is required"],
        maxLength: [50, "The product name cannot exceed 50 characters"]
    },
    productDescription: {
        type: String,
        required: [true, "The product description is required"],
        maxLength: [250, "The product description cannot exceed 250 characters"]
    },
    productPrice: {
        type: Number,
        min: [0, "The price cannot be zero"],
        required: [true, "The product price is required"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"]
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["Electronics", "Clothing", "Food", "Home", "Toys", "Others"],
        required: [true, "The product category is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
    entryDate: {
        type: Date,
        required: [true, "The entry date is required"],
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: true
});

productSchema.methods.toJSON = function() {
    const { _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
};

export default model("Product", productSchema);