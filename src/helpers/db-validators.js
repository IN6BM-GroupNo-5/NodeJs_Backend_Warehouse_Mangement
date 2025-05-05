import Client from "../client/client.model.js";
import Provider from "../provider/provider.model.js";

// ---------- Validaciones para Clientes ----------
export const clientExists = async (uid = " ") => {
    const client = await Client.findById(uid);
    if (!client) {
        throw new Error("Client not found");
    }
};

export const clientNameExists = async (name = " ") => {
    const client = await Client.findOne({ name });
    if (!client) {
        throw new Error("Client not found");
    }
};

// ---------- Validaciones para Proveedores ----------
export const providerExists = async (uid = " ") => {
    const provider = await Provider.findById(uid);
    if (!provider) {
        throw new Error("Provider not found");
    }
};

export const providerNameExists = async (name = " ") => {
    const provider = await Provider.findOne({ name });
    if (!provider) {
        throw new Error("Provider not found");
    }
};
