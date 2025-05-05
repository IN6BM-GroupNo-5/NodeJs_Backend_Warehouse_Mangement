import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Product name is needed"],
        maxLength: [50, "The product name cannot exceed 50 characters"],
        unique: true
    },
    category: {
        type: String,
        enum: ["GENERAL", "FOOD", "DRINKS", "ELECTRONICS", "CLEANING", "OFFICE", "CLOTHING", "PHARMACY", "FURNITURE", "TOOLS", "CAR_FUTURES", "TOYS",
            "SPORTS", "PERSONAL_CARE", "OTHER"],
        default: "GENERAL",
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    entryDate: {
        type: Date,
        default: Date.now
    },
    expireDate: {
        type: Date,
        required: true
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

productSchema.pre('save', function (next) {
    if (this.stock === 0) {
        this.status = false;
        if (!this.name.startsWith('AGOTADO - ')) {
            this.name = `AGOTADO - ${this.name}`;
        }
    }
    next();
});

productSchema.methods.toJSON = function () {
    const { _id, ...productDb } = this.toObject()
    productDb.pid = _id
    return productDb
}

export default model("Product", productSchema)