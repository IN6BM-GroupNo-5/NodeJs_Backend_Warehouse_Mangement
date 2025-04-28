import { hash, verify } from 'argon2';
import User from "./user.model.js";

export const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
        
        const user = await User.create(data);
        
        return res.status(201).json({
            message: "User successfully registered",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error registering the user",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { user } = req;
        const data = req.body;

        const existingUser = await User.findById(user._id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const passwordMatch = await verify(existingUser.password, data.password);
        if (!passwordMatch) {
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            user, { $set: data }, { new: true }
        );

        if (!updatedUser) {
            return res.status(403).json({
                success: false,
                message: "Unable to update the user"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User successfully updated",
            updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating the user",
            error: err.message
        });
    }
};

export const updateAdminMode = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const adminToUpdate = await User.findOneAndUpdate(
            { _id: uid, role: { $ne: "ADMIN" } }, { $set: data }, { new: true }
        );

        if (!adminToUpdate) {
            return res.status(403).json({
                success: false,
                message: "Unable to update admin mode"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin mode successfully updated",
            adminToUpdate
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating admin mode",
            error: err.message
        });
    }
};

export const deactivateUserAdminMode = async (req, res) => {
    try {
        const { uid } = req.params;

        const userToDeactivate = await User.findOneAndUpdate(
            { _id: uid, role: { $ne: "ADMIN" } }, { status: false }, { new: true }
        );

        if (!userToDeactivate) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User successfully deactivated",
            userToDeactivate
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deactivating the user",
            error: err.message
        });
    }
};

export const deactivateUser = async (req, res) => {
    try {
        const { user } = req;
        const userToDelete = await User.findOneAndUpdate(user, { status: false }, { new: true });
        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User successfully deactivated",
            userToDelete
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deactivating the user",
            error: err.message
        });
    }
};