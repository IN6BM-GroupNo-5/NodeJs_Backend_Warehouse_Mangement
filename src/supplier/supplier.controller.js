import Supplier from "./supplier.model.js";

export const createSupplier = async (req, res) => {
    try {
        const admin = req.userJwt;
        const dataReceived = req.body;

        const supplier = await Supplier.create(dataReceived);

        return res.status(201).json({
            message: "Supplier registered succesfully",
            supplier_created: {
                name: supplier.name,
                contact: supplier.contactEmail,
                products: supplier.products,
                created_at: supplier.createdAt
            },
            administrator_account: {
                name: admin.completeName,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Supplier creation failed, check the information",
            error: err.message
        });
    }
};

export const getSuppliers = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, suppliersFound] = await Promise.all([
            Supplier.countDocuments(query),
            Supplier.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        const suppliersList = suppliersFound.map(supplier => ({
            name: supplier.name,
            contact: supplier.contactEmail,
            products: supplier.products,
            created_at: supplier.createdAt
        }));

        return res.status(200).json({
            success: true,
            message: "suppliers list got successfully",
            total,
            suppliers: suppliersList
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get suppliers",
            error: err.message
        });
    }
};

export const findSuppliers = async (req, res) => {
    try {
        const account = req.userJwt;
        const { sid } = req.params;

        const supplierFound = await Supplier.findById(sid).populate("products", "name stock");;

        if(!supplierFound  || supplierFound.status === false){
            return res.status(400).json({
                success: false,
                message: "Supplier not found"
            });
        };

        return res.status(200).json({
            success: true,
            message: "Supplier found successfully",
            Supplier: {
                name: supplierFound.name,
                contact: supplierFound.contactEmail,
                createdAt: supplierFound.createdAt,
                products: supplierFound.products, 
            }
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to find this supplier",
            error: err.message,
        });
    }
};


export const editSupplier = async (req, res) => {
    try {
        const { sid } = req.params;
        const newData = req.body;
        const adminAccount = req.userJwt;

        const supplier = await Supplier.findById(sid);

        if (!supplier) {
            return res.status(400).json({
                success: false,
                message: "Supplier not found"
            });
        };

        const updatedSupplier = await Supplier.findByIdAndUpdate(sid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Supplier changes updated succesfully',
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role,
            },
            supplier_account: {
                name: updatedSupplier.name,
                contactEmail: updatedSupplier.contactEmail,
                products: updatedSupplier.products,
                createdAt: updatedSupplier.createdAt,
                updatedAt: updatedSupplier.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Failed to update supplier changes',
            error: err.message
        });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const { sid } = req.params;
        const adminAccount = req.userJwt;

        const supplier = await Supplier.findByIdAndUpdate(sid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Supplier account deleted successfully",
            administrator_account: {
                completeName: adminAccount.completeName,
                role: adminAccount.role,
            },
            supplier_account: {
                name: supplier.name,
                contactEmail: supplier.contactEmail,
                status: supplier.status,
                createdAt: supplier.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete supplier account",
            error: err.message
        });
    }
};
