import { verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "This account doesnt exists",
                error: "the account provided doesnt exists"
            });
        };

        if (!user.status) {
            return res.status(403).json({
              message: "The account has been deleted",
              error: "Account not found"
            });
          }

        const correctPassword = await verify(user.password, password);

        if (!correctPassword) {
            return res.status(400).json({
                message: "Password incorrect",
                error: "the password you provided its incorrect"
            });
        }
        const token = await generateJWT(user._id);

        return res.status(200).json({
            message: "Login successful",
            login_information: {
                Name: user.completeName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                token: token
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};
