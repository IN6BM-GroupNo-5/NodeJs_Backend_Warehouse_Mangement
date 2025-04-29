import { Router } from "express";
import { registerUser, updateUser, updateAdminMode, deactivateUserAdminMode, deactivateUser} from "../controllers/user.controller.js";
import { registerValidator, updateProfileValidator, updateAdminModeValidator, deactivateAdminModeValidator, deactivateUserValidator} from "../middlewares/user.validator.js"; 

const router = Router();

router.post("/register", registerValidator, registerUser);

router.put("/update", updateProfileValidator, updateUser);

router.put("/admin/update/:uid", updateAdminModeValidator, updateAdminMode);

router.put("/admin/deactivate/:uid", deactivateAdminModeValidator, deactivateUserAdminMode);

router.put("/deactivate", deactivateUserValidator, deactivateUser);

export default router;

// Se actualizo el archivo user.routes.js para incluir un nombre adecuado a las rutas y se eliminaron las rutas innecesarias.