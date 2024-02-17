import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post("/create-semester", validateRequest(academicSemesterValidation.academicSemesterCreate), academicSemesterControllers.insertIntoDb);
router.get("/", academicSemesterControllers.getAll);
router.get("/:id", academicSemesterControllers.getById);
router.patch("/:id", validateRequest(academicSemesterValidation.academicSemesterUpdate), academicSemesterControllers.fetchAndUpdate);
router.delete("/:id", academicSemesterControllers.deleteFromDB);

export const academicSemesterRouters = router;