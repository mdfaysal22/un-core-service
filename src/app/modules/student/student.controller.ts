import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { studentService } from "./student.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createStudent = catchAsync(
    async(req:Request, res:Response) => {
        const data = req.body;
        const result = await studentService.createStudent(data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student created successfully",
            data: result
        })
    }
);


const getAll = catchAsync(
    async(req: Request, res: Response) => {
        const searchableFields = pick(req.query , ["searchTerm", "gender", "bloodGroup", "academicSemesterId", "academicDepartmentId", "academicFacultyId"]);
        const paginationOptions = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
        const result = await studentService.getAll(searchableFields, paginationOptions);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student get All",
            meta: result.meta,
            data: result.data
        })
    }
)


const getById = catchAsync(
    async(req: Request, res: Response) => {
        const id = req.params.id;
        const result = await studentService.getById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student getById",
            data: result
        })
    }
);


const fetchAndUpdate = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;
        const data = req.body;
        const result = await studentService.fetchAndUpdate(id, data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student updated successfully",
            data: result
        })
    }
)

const deleteFromDB = catchAsync(
    async(req:Request, res: Response) => {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success:true,
            message: "Student deleted successfully",
            data: await studentService.deleteFromDB(req.params.id)
        })
    }
)


export const studentController = {
    createStudent,
    getAll,
    getById,
    fetchAndUpdate,
    deleteFromDB
}