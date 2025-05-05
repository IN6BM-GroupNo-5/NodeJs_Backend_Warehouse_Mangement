import Products from "../products/products.model.js";

export const productExists = async (uid = " ") => {
    const product = await Products.findById(uid);
    if (!product) {
        throw new Error("Product not found");
    }
};

export const productNameExists = async (name = " ") => {
    const product = await Products.findOne({ productName: name });
    if (!product) {
        throw new Error("Product not found");
    }
};