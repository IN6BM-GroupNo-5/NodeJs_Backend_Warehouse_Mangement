import Movement from "./movement.model.js";

export const registerEntry = async (req, res) => {
    try {
        const account = req.userJwt;
        const dataEntry = { ...req.body, user: account._id, move: "ENTRY" };

        const entry = await Movement.create(dataEntry);

        return res.status(201).json({
            message: "Entry registered successfully",
            entry: {
                move: entry.move,
                account: {
                    completeName: account.completeName,
                    role: account.role
                },
                product: entry.product,
                quantity: entry.quantity,
                date: entry.date
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Movement creation failed, check the information",
            error: err.message
        });
    }
};

export const registerExit = async (req, res) => {
    try {
        const account = req.userJwt;
        const dataExit = { ...req.body, user: account._id, move: "EXIT" };

        const exit = await Movement.create(dataExit);

        return res.status(201).json({
            message: "Exit registered successfully",
            Exit: {
                move: exit.move,
                account: {
                    completeName: account.completeName,
                    role: account.role
                },
                product: exit.product,
                quantity: exit.quantity,
                date: exit.date,
                reason: exit.reason,
                destination: exit.destination
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Movement creation failed, check the information",
            error: err.message
        });
    }
};


export const getMovements = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { };

        const [total, movements] = await Promise.all([
            Movement.countDocuments(query),
            Movement.find(query)
                .populate("product", "name category")
                .populate("user", "completeName email")
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            message: "Movements list got successfully",
            account_logged: {
                completeName: account.completeName,
                email: account.email
            },
            total,
            movements
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get movements list",
            error: err.message
        });
    }
};

export const findMovements = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const {pid} = req.params;

        const filterParameter = {};
        
        filterParameter.product = pid;
        
        const [total, movements] = await Promise.all([
            Movement.countDocuments(filterParameter),
            Movement.find(filterParameter)
                .populate("product", "name")
                .populate("user", "completeName")
                .skip(Number(from))
                .limit(Number(limit))
                .sort({ date: -1 })
        ]);

        return res.status(200).json({
            success: true,
            message: "Movements found successfully",
            account_logged: {
                completeName: account.completeName,
                email: account.email
            },
            total,
            Registers: movements
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to find the movements you sought",
            error: err.message,
        });
    }
};
