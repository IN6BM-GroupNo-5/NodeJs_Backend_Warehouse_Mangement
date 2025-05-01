import Provider from "../provider/provider.model.js";

export const registerProvider = async (req, res) => {
    try {
        const data = req.body;
        const provider = await Provider.create(data);
        res.status(201).json({
            message: "Proveedor registrado correctamente",
            provider
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el proveedor",
            error: error.message
        });
    }
};
