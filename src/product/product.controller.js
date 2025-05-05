import Product from "./product.model.js";


export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const account = req.userJwt;


        const product = await Product.create(productData);

        return res.status(201).json({
            message: "Product created succesfully",
            administrator_account: {
                completeName: account.completeName,
                email: account.email
            },
            product_information: {
                name: product.name,
                category: product.category,
                supplier: product.supplier,
                price: product.price,
                stock: product.stock,
                expire: product.expireDate,
                status: product.status
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "New product creation failed,check the information please",
            error: err.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, productsFound] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate("supplier", "name status")
        ]);

        return res.status(200).json({
            success: true,
            message: "Products list got successfully",
            account_logged: {
                completeName: account.completeName,
                email: account.email
            },
            total,
            products: productsFound
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get products",
            error: err.message
        });
    }
};

export const findProducts = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const { pid, name, category, entryDate } = req.body;

        let filterParameter = { ...query };

        if (pid) filterParameter._id = pid;
        if (name) filterParameter.name = { $regex: name, $options: "i" };
        if (category) filterParameter.category = category;

        if (entryDate) { 
            const date = new Date(entryDate); 
            const nextDay = new Date(entryDate); 
            nextDay.setDate(date.getDate() + 1); 
            filterParameter.entryDate = {$gte: date,$lt: nextDay};// documentos mayores al dia ingresado y menores al dia siguiente
        }
        
        let sortParameter = {};

        let productsFound = await Product.find(filterParameter).skip(Number(from)).limit(Number(limit)).sort(sortParameter).populate("supplier", "name status");

        const total = await Product.countDocuments(filterParameter);

        return res.status(200).json({
            success: true,
            message: "Products found successfully",
            total,
            Products: productsFound
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to find the products you sought",
            error: err.message,
        });
    }
};


export const editProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const newData = req.body;
        const account = req.userJwt;

        const updated = await Product.findByIdAndUpdate(pid, newData, { new: true });

        return res.status(201).json({
            message: "Product data changed succesfully",
            admin: {
                completeName: account.completeName,
                email: account.email,
                role: account.role,
            },
            updated
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update product data",
            error: err.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const {password} = req.body;
        const account = req.userJwt;

        const confirmation = await verify(account.password, password);
        
        if (!confirmation) {
            return res.status(400).json({
                message: "you can not delete this product now, try again later",
                error: "confirmation unvalid"
            });
        }

        const deleted = await Product.findByIdAndUpdate(pid, { name: "DELETED", status: false }, { new: true });

        return res.status(201).json({
            message: "Product deleted succesfully",
            admin: {
                completeName: account.completeName,
                role: account.role,
            },
            product_deleted: deleted
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete this product",
            error: err.message
        });
    }
};




