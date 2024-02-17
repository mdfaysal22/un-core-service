import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { academicSemesterServices } from "./academicSemester.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";


const insertIntoDb : RequestHandler = catchAsync(
    async (req:Request, res:Response) => {
        const data = req.body;
        const result = await academicSemesterServices.insertIntoDb(data);

        sendResponse(res, {
            statusCode : httpStatus.OK,
            success: true,
            message: "Academic Semester Created Successfully",
            data: result
        })
    }
);

const getAll = catchAsync(
    async(req:Request, res:Response) => {
        const filters = pick(req.query, ["searchTerm", "code", "year", "startMonth", "endMonth"]);
        const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
        const result = await academicSemesterServices.getAll(options, filters);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message: "Academic Semester Get Successful",
            data: result.data,
            meta: result.meta
        })
    }
);

const getById = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;
        const result = await academicSemesterServices.getById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Semester Get Successful by Id",
            data: result
        })
    }
);

const fetchAndUpdate = catchAsync(
    async(req:Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        const result = await academicSemesterServices.fetchAndUpdate(id, data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Semester updated successfully",
            data: result
        })
    }
)

const deleteFromDB = catchAsync(
    async(req:Request, res: Response) => {
        const id = req.params.id;
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Semester delete successfully",
            data: await academicSemesterServices.deleteFromDB(id)
        })
    }
)
export const academicSemesterControllers = {
    insertIntoDb,
    getAll,
    getById,
    fetchAndUpdate,
    deleteFromDB
}