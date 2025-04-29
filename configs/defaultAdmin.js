import { hash } from "argon2";
import User from "../src/user/user.model.js";

export const defaultAdmin = async () => {
    try {
        const adminExist = await User.findOne({ role: "ADMIN" });

        if (adminExist) {
            console.log("There is already an administrator");
            return;
        }

        await User.create({
            fullName: "becheverria",
            email: "becheverria@gmail.com",
            password: await hash("AdminPass@123"),
            role: "ADMIN",
            status: true
        });

        console.log("Default administrator successfully created");
    } catch (err) {
        console.error("Error creating administrator:", err.message);
    }
};
