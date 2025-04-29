import { verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Email does not exist"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                fullName: user.fullName,  
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};
