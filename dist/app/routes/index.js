"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicSemster_routers_1 = require("../modules/academicSemester/academicSemster.routers");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/academicSemester",
        routes: academicSemster_routers_1.academicSemesterRouters
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
