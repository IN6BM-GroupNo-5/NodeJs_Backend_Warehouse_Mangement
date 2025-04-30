import { Router } from "express";
import { 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    filterProducts 
} from "./products.controller.js";

import { 
    createProductValidator, 
    updateProductValidator, 
    deleteProductValidator,
    filterProductsValidator
} from "../middlewares/products-validators.js";

const router = Router();

router.post("/addProduct", createProductValidator, addProduct);

router.put("/updateProduct/:id", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

router.get("/filterProducts", filterProductsValidator, filterProducts);

export default router;