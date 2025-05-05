import User from "./user.model.js";
import { hash } from "argon2";

export const createUser = async (req, res) => {
    try {
        const admin = req.userJwt;
        const dataReceived = req.body;

        const encryptedPassword = await hash(dataReceived.password);

        dataReceived.password = encryptedPassword;

        const user = await User.create(dataReceived);

        return res.status(201).json({
            message: "User registered succesfully",
            account_created: {
                completeName: user.completeName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
            administrator_account: {
                completeName: admin.completeName,
                email: admin.email,
                role: admin.role,
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "User creation failed,check the information",
            error: err.message
        });
    }
};


export const getUsers = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, usersFound] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        const usersList = usersFound.map(users => ({
            name: users.completeName,
            role: users.role,
            email: users.email,
            status: users.status,
            createdAt: users.createdAt
        }));

        return res.status(200).json({
            success: true,
            message: "users list got successfully",
            total,
            users: usersList
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get users",
            error: err.message
        });
    }
};

export const findUser = async (req, res) => {
    try {
        const account = req.userJwt;
        const { uid } = req.params;

        const userFound = await User.findById(uid);

        if (!userFound || userFound.status === false) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account found successfully",
            administrator_account: {
                name: account.completeName,
                role: account.role
            },
            account_found: {
                completeName: userFound.completeName,
                email: userFound.email,
                role: userFound.role,
                createdAt: userFound.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find this account",
            error: err.message
        });
    }
};


export const editUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const adminAccount = req.userJwt;

        const account = await User.findById(uid);

        if (!account) {
            return res.status(400).json({
                success: false,
                message: "Employee not found"
            });
        };

        if (account.role === "ADMINISTRATOR") {
            if (uid !== adminAccount._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "OOnly the administrator who owns this account can edit it"
                });
            };
        };

        if (newData.password) {
            newData.password = await hash(newData.password);
        }

        const employee = await User.findByIdAndUpdate(uid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role,
            },
            employee_account: {
                completeName: employee.completeName,
                role: employee.role,
                createdAt: employee.createdAt,
                updatedAt: employee.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile changes for the employee',
            error: err.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const adminAccount = req.userJwt;

        const employee = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (employee.role === "ADMINISTRATOR") {
            if (uid !== adminAccount._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Only the administrator who owns this account can delete it"
                });
            };
        };

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully ",
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role,
            },
            employee_account: {
                completeName: employee.completeName,
                role: employee.role,
                email: employee.email,
                status: employee.status,
                createdAt: employee.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete employee account",
            error: err.message
        });
    }
};
