import Client from "./client.model.js";

export const createClient = async (req, res) => {
    try {
        const admin = req.userJwt;
        const dataReceived = req.body;

        const client = await Client.create(dataReceived);

        return res.status(201).json({
            message: "Client registered successfully",
            client_created: {
                name: client.name,
                email: client.email,
                status: client.status,
                created_at: client.createdAt
            },
            administrator_account: {
                name: admin.completeName,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Client creation failed, check the information",
            error: err.message
        });
    }
};

export const getClients = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, clientsFound] = await Promise.all([
            Client.countDocuments(query),
            Client.find(query).skip(Number(from)).limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            message: "Clients list retrieved successfully",
            total,
            clients: clientsFound.map(client => ({
                name: client.name,
                email: client.email,
                status: client.status,
                created_at: client.createdAt
            }))
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get clients",
            error: err.message
        });
    }
};

export const findClient = async (req, res) => {
    try {
        const { cid } = req.params;
        const clientFound = await Client.findById(cid);

        if (!clientFound || clientFound.status === false) {
            return res.status(400).json({
                success: false,
                message: "Client not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Client found successfully",
            client: {
                name: clientFound.name,
                email: clientFound.email,
                status: clientFound.status,
                createdAt: clientFound.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to find this client",
            error: err.message
        });
    }
};

export const editClient = async (req, res) => {
    try {
        const { cid } = req.params;
        const newData = req.body;
        const adminAccount = req.userJwt;

        const updatedClient = await Client.findByIdAndUpdate(cid, newData, { new: true });

        if (!updatedClient) {
            return res.status(400).json({
                success: false,
                message: "Client not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Client updated successfully',
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role
            },
            client_account: {
                name: updatedClient.name,
                email: updatedClient.email,
                status: updatedClient.status,
                updatedAt: updatedClient.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update client',
            error: err.message
        });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { cid } = req.params;
        const adminAccount = req.userJwt;

        const client = await Client.findByIdAndUpdate(cid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Client deleted successfully",
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role
            },
            client_account: {
                name: client.name,
                email: client.email,
                status: client.status,
                createdAt: client.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete client",
            error: err.message
        });
    }
};
