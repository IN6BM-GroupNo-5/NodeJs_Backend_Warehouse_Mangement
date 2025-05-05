import Product from "./products.model.js";

export const addProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice, category, stock, provider, entryDate } = req.body;

        const product = await Product.create({
            productName,
            productDescription,
            productPrice,
            category,
            stock,
            provider,
            entryDate
        });

        res.status(200).json({
            success: true,
            message: "The product has been added successfully",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding the product",
            error: err.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productDescription, productPrice, category, stock, provider, entryDate } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { productName, productDescription, productPrice, category, stock, provider, entryDate },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating the product",
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting the product",
            error: err.message
        });
    }
};

export const filterProducts = async (req, res) => {
    try {
        const { productName, category, startDate, endDate } = req.query;

        // Build the filter dynamically
        const filter = { status: true };

        if (productName) {
            filter.productName = new RegExp(productName, "i"); // Case-insensitive search
        }

        if (category) {
            filter.category = category; // Filter by category
        }

        if (startDate && endDate) {
            filter.entryDate = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Filter by date range
        }

        // Find products with the constructed filter
        const products = await Product.find(filter).select("productName productDescription productPrice stock category entryDate");

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found with the specified filters"
            });
        }

        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching products with filters",
            error: err.message
        });
    }
};