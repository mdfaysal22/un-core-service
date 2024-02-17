import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post("/createFaculty",validateRequest(academicFacultyValidation.academicFacultyCreate),  academicFacultyController.createFaculty);
router.get("/:id", academicFacultyController.getById);
router.get("/", academicFacultyController.getAll);
router.patch("/:id", validateRequest(academicFacultyValidation.academicFacultyUpdate), academicFacultyController.fetchAndUpdate);
router.delete("/:id", academicFacultyController.deleteFromDB);

export const academicFaculty = router;