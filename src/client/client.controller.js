import Client from "../client/client.model.js";

export const registerClient = async (req, res) => {
    try {
        const data = req.body;
        const client = await Client.create(data);
        res.status(201).json({
            message: "Cliente registrado correctamente",
            client
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el cliente",
            error: error.message
        });
    }
};
