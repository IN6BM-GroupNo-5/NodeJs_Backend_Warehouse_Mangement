import Product from "../product/product.model.js";
import Movement from "../movement/movement.model.js";
import PDFDocument from "pdfkit";

const generatePDFReport = ({ title, columns, data, res, filename, user }) => {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  const chunks = [];

  doc.on("data", chunk => chunks.push(chunk));
  doc.on("end", () => {
    const result = Buffer.concat(chunks);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(result);
  });

  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();
  doc.fontSize(10).text(`Generado por: ${user.completeName} - ${user.email}`);
  doc.text(`Fecha: ${new Date().toLocaleString()}`);
  doc.moveDown();

  // Tabla de encabezados
  doc.fontSize(12).text(columns.join(" | "));
  doc.moveDown();

  // Filas de datos
  data.forEach(row => {
    doc.fontSize(10).text(row.join(" | "));
  });

  doc.end();
};

// Endpoint general para reportes PDF
export const generateGeneralPDF = async (req, res) => {
  try {
    const { type } = req.query;
    const user = req.userJwt;

    let data = [], columns = [], title = "", filename = "";

    switch (type) {
      case "inventory": {
        const products = await Product.find({ status: true });
        data = products.map(p => [p.name, p.stock.toString(), `$${p.price.toFixed(2)}`]);
        columns = ["Producto", "Stock", "Precio"];
        title = "Inventario Actual de Productos";
        filename = "inventario.pdf";
        break;
      }

      case "movements": {
        const movements = await Movement.find()
          .populate("product", "name")
          .populate("user", "completeName");

        data = movements.map(m => [
          m.product?.name || "-",
          m.type,
          m.quantity.toString(),
          new Date(m.date).toLocaleDateString(),
          m.user?.completeName || "-"
        ]);
        columns = ["Producto", "Tipo", "Cantidad", "Fecha", "Usuario"];
        title = "Historial de Movimientos";
        filename = "movimientos.pdf";
        break;
      }

      default:
        return res.status(400).json({
          success: false,
          message: "Tipo de reporte inválido. Usa ?type=inventory o ?type=movements"
        });
    }

    return generatePDFReport({ title, columns, data, res, filename, user });
  } catch (err) {
    console.error("Error al generar PDF:", err);
    return res.status(500).json({
      success: false,
      message: "Error interno al generar el PDF",
      error: err.message
    });
  }
};
