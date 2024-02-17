import express from 'express';
import { academicSemesterRouters } from '../modules/academicSemester/academicSemester.routers';
import { academicFaculty } from '../modules/academicFaculty/academicFaculty.routers';
import { studentRouters } from '../modules/student/student.routers';
import { academicDepartmentRouters } from '../modules/academicDepartment/academicDepartment.routers';
import { facultyRouters } from '../modules/faculty/faculty.routers';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academicSemester",
    routes: academicSemesterRouters
  },
  {
    path: "/academicFaculty",
    routes: academicFaculty
  },
  {
    path: "/academicDepartment",
    routes: academicDepartmentRouters
  },
  {
    path: "/student",
    routes: studentRouters
  },
  {
    path: "/faculty",
    routes: facultyRouters
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
