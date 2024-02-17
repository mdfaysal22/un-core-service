import { Router } from "express";
import { academicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";

const router = Router();

router.post("/createDepartment", validateRequest(academicDepartmentValidation.createDepartment), academicDepartmentController.createDepartment);
router.get("/", academicDepartmentController.getAll);
router.get("/:id", academicDepartmentController.getById);
router.patch("/:id", validateRequest(academicDepartmentValidation.updateDepartment), academicDepartmentController.fetchAndUpdate);
router.delete("/:id", academicDepartmentController.deleteFromDB);

export const academicDepartmentRouters = router;