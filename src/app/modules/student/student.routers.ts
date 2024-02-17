import { Router } from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidation } from "./student.validation";

const router = Router();

router.post("/createStudent", validateRequest(studentValidation.createStudentValidation) , studentController.createStudent);
router.get("/", studentController.getAll);
router.get("/:id", studentController.getById);
router.patch("/:id", validateRequest(studentValidation.updateStudent), studentController.fetchAndUpdate);
router.delete("/:id", studentController.deleteFromDB);

export const studentRouters = router;
