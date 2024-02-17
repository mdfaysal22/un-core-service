import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { academicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createFaculty = catchAsync(
    async(req : Request, res: Response) => {
        const data = req.body;
        const result = await academicFacultyService.createFaculty(data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty Created",
            data: result
        })
    }
);

const getAll = catchAsync(
    async(req:Request, res:Response) => {
        const searchTerm = pick(req.query , ['searchTerm'])
        const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
        const result = await academicFacultyService.getAll(searchTerm, options);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty Get Successfully",
            data: result.data,
            meta: result.meta
        })
    }
)

const getById = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;
        const result = await academicFacultyService.getById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty Get Successful by Id",
            data :result
        })
    }
)

const fetchAndUpdate = catchAsync(
    async(req:Request, res:Response) => {
        const id  = req.params.id;
        const payload = req.body;

        const result = await academicFacultyService.fetchAndUpdate(id, payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty update successfully",
            data: result
        })
    }
)

const deleteFromDB = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Faculty delete successfully",
            data: await academicFacultyService.deleteFromDB(id)
        })
    }
)
export const academicFacultyController = {
    createFaculty,
    getById,
    getAll,
    fetchAndUpdate,
    deleteFromDB
}