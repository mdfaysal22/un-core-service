import { Router } from "express";
import { facultyController } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidation } from "./faculty.validation";

const router = Router();

router.post('/createFaculty', validateRequest(facultyValidation.createFaculty), facultyController.create);
router.get('/', facultyController.fetchAll);
router.get("/:id", facultyController.fetchById);
router.patch("/:id", validateRequest(facultyValidation.facultyUpdate), facultyController.fetchAndUpdate);
router.delete("/:id", facultyController.deleteFromDB);


export const facultyRouters = router;
