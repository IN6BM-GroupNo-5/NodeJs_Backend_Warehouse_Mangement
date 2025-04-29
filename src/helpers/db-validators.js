import User from "../user/user.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error("No user exists with the provided ID");
    }
};

export const adminRole = async (uid = "", { req }) => {
    if (!req.usuario || !req.usuario.role) {
        throw new Error("Could not verify the user's role");
    }

    const userToModify = await User.findById(uid);
    if (!userToModify) {
        throw new Error("User not found");
    }

    if (req.usuario._id.toString() === uid) {
        return;
    }

    if (userToModify.role === "ADMIN" && req.usuario.role === "ADMIN") {
        throw new Error("You do not have permission to modify another admin");
    }
};

export const adminRoleDelete = async (uid = "", { req }) => {
    if (!req.usuario || !req.usuario.role) {
        throw new Error("Could not verify the user's role");
    }

    const userToDelete = await User.findById(uid);
    if (!userToDelete) {
        throw new Error("User not found");
    }

    if (req.usuario._id.toString() === uid) {
        return;
    }

    if (userToDelete.role === "ADMIN" && req.usuario.role === "ADMIN") {
        throw new Error("You do not have permission to delete another admin");
    }
};

export const userUpdateProfile = async (uid = "", { req }) => {
    if (!req.usuario) {
        throw new Error("User not authenticated");
    }

    const user = await User.findById(uid);
    if (!user) {
        throw new Error("User not found");
    }

    if (user._id.toString() !== req.usuario._id.toString()) {
        throw new Error("You can't update this profile");
    }
};
