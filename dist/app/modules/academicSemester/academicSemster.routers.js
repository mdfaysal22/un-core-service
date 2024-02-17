"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRouters = void 0;
const express_1 = require("express");
const academicSemester_controllers_1 = require("./academicSemester.controllers");
const router = (0, express_1.Router)();
router.post("/create-semester", academicSemester_controllers_1.academicSemesterControllers.insertIntoDb);
exports.academicSemesterRouters = router;
