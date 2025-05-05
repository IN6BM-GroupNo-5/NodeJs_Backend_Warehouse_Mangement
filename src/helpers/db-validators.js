import User from "../user/user.model.js";
import Product from "../product/product.model.js"
import Supplier from "../supplier/supplier.model.js";
import Client from "../client/client.model.js";

export const emailExists = async (email = " ") => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email provided already exists`);
    }
};

export const userExists = async (uid = " ") => {
    const exists = await User.findById(uid);
    if (!exists) {
        throw new Error(`The user provided doesnt exists`);
    }
};

export const validRole = async (role = " ") => {
    if (role !== "ADMINISTRATOR" && role !== "EMPLOYEE") {
        throw new Error(`Unvalid role`);
    };
};

export const supplierExists = async (sid = " ") => {
    const exists = await Supplier.findById(sid);
    if (!exists) {
        throw new Error(`The supplier provided doesnt exists`);
    }
};

export const productFound = async (pid = " ") => {
    const found = await Product.findById(pid)
    if(!found){
        throw new Error(`The product provided does not exists`)
    };
};


const existentCategories = [
    "GENERAL", "FOOD", "DRINKS", "ELECTRONICS", "CLEANING", "OFFICE",
    "CLOTHING", "PHARMACY", "FURNITURE", "TOOLS", "CAR_FUTURES", "TOYS",
    "SPORTS", "PERSONAL_CARE", "OTHER"
]; 

export const validCategory = async (category = "") => {
    if (!existentCategories.includes(category)) {
        throw new Error(`The category provided doesn´t exists. Categories available: ${existentCategories.join(", ")}`);
    }
};

export const clientExists = async (cid = " ") => {
    const exists = await Client.findById(cid);
    if (!exists) {
        throw new Error(`The client provided doesnt exists`);
    }
};