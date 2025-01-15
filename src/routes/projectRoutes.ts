import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.post(
  "/",
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("las descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

export default router;
