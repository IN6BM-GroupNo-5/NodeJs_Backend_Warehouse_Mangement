import Product from "../product/product.model.js";
import Movement from "./movement.model.js";
import PDFDocument from "pdfkit";

export const getProductsInventory = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };

        const [total, productsFound,stockInfo] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit)),
            Product.aggregate([
                { $match: query },
                { $group: { _id: null, totalStock: { $sum: "$stock" }, totalValue: { $sum: { $multiply: ["$stock", "$price"] } } } }
            ])
        ]);

        const totalStock = stockInfo[0]?.totalStock || 0;
        const totalValue = stockInfo[0]?.totalValue || 0;

        const productsList = productsFound.map(product => ({
            name: product.name,
            stock: product.stock
        }));

        return res.status(200).json({
            success: true,
            message: "Products list got successfully",
            account_logged: {
                completeName: account.completeName,
                email: account.email
            },
            total,
            totalStock,
            inventory_value: totalValue,
            products: productsList
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to get products",
            error: err.message
        });
    }
};

export const generateInventoryPDF = async (req, res) => {
    try {
        const query = { status: true };

        const [productsFound, stockInfo] = await Promise.all([
            Product.find(query),
            Product.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: null,
                        totalStock: { $sum: "$stock" },
                        totalValue: { $sum: { $multiply: ["$stock", "$price"] } }
                    }
                }
            ])
        ]);

        const totalStock = stockInfo[0]?.totalStock || 0;
        const totalValue = stockInfo[0]?.totalValue || 0;

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=inventory.pdf");
        doc.pipe(res);

        doc.fontSize(16).text("Inventory Report", { align: "center" });
        doc.moveDown();
        productsFound.forEach(p => {
            doc.fontSize(12).text(`Product: ${p.name} | Stock: ${p.stock}`);
        });

        doc.moveDown();
        doc.fontSize(12).text(`total inventory stock: ${totalStock}`);
        doc.text(`Total inventory value: Q${totalValue}`);

        doc.end();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating PDF",
            error: err.message
        });
    }
};



export const getMovementsInventory = async (req, res) => {
    try {
        const account = req.userJwt;
        const { limit = 10, from = 0 } = req.query;
        const { fromDate, toDate } = req.body;

        const query = {};

        if (fromDate && toDate) {
            query.date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }

        const [total, movements] = await Promise.all([
            Movement.countDocuments(query),
            Movement.find(query)
                .populate("product", "name")
                .populate("user", "completeName")
                .skip(Number(from))
                .limit(Number(limit))
                .sort({ date: -1 })
        ]);

        return res.status(200).json({
            success: true,
            message: "Movements retrieved successfully",
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
            message: "Failed to retrieve movements",
            error: err.message
        });
    }
};

export const generateMovementsPDF = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body;

        const query = {};
        if (fromDate && toDate) {
            query.date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }

        const movements = await Movement.find(query)
            .populate("product", "name")
            .populate("user", "completeName")
            .sort({ date: -1 });

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=movements.pdf");
        doc.pipe(res);

        doc.fontSize(16).text("Informe de Movimientos", { align: "center" });
        doc.moveDown();

        movements.forEach(m => {
            doc.fontSize(12).text(`Fecha: ${m.date.toLocaleString()} | Producto: ${m.product.name} | Cantidad: ${m.quantity} | Tipo: ${m.type}`);
        });

        doc.end();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error generating PDF",
            error: err.message
        });
    }
};


export const getProductStats = async (req, res) => {
    try {
        const { fromDate, toDate } = req.body || {};

        const matchStage = {};
        if (fromDate && toDate) {
            matchStage.date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }

        const stats = await Movement.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$product",
                    totalMoved: { $sum: "$quantity" },
                    firstActivity: { $min: "$date" },
                    lastActivity: { $max: "$date" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $project: {
                    productName: "$product.name",
                    totalMoved: 1,
                    firstActivity: 1,
                    lastActivity: 1
                }
            },
            { $sort: { totalMoved: -1 } }
        ]);

        return res.status(200).json({
            success: true,
            message: "Product stats generated",
            stats
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate product statistics",
            error: err.message
        });
    }
};
