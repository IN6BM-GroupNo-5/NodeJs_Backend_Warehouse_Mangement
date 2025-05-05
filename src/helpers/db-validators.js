import Product from "../product/product.model.js"

export const validRole = async (role = " ") => {
    if (role !== "ADMINISTRATOR" && role !== "EMPLOYEE") {
        throw new Error(`Unvalid role`);
    };
};

export const productFound = async (pid = " ") => {
    const found = await Product.findById(pid)
    if(!found){
        throw new Error(`The product provided does not exists`)
    };
};
