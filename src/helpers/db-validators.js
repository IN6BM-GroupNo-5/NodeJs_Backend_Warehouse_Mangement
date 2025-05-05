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


export const clientExists = async (cid = " ") => {
    const exists = await Client.findById(cid);
    if (!exists) {
        throw new Error(`The client provided doesnt exists`);
    }
};