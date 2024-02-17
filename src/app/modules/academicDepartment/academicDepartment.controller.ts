import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { academicDepartmentService } from "./academicDepartment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createDepartment = catchAsync(
    async(req:Request, res:Response) => {
        const data = req.body;
        const result = await academicDepartmentService.createDepartment(data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Department Created Successfully",
            data: result
        })
    }
);

const getAll = catchAsync(
    async(req: Request, res: Response) => {
        const searching = pick(req.query , ["searchTerm"]);
        const paginationOptions = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])

        const result = await academicDepartmentService.getAll(searching, paginationOptions);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Department Get",
            data: result.data,
            meta: result.meta
        })
    }
)


const getById = catchAsync(
    async(req:Request, res: Response) => {
        const id = req.params.id;
        const result = await academicDepartmentService.getById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Department Get Successfully by ID",
            data: result
        })
    }
)

const fetchAndUpdate = catchAsync(
    async(req:Request, res: Response) => {
        const id = req.params.id;
        const payload = req.body;

        const result = await academicDepartmentService.fetchAndUpdate(id, payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Successfully updated",
            data: result
        })
    }
);

const deleteFromDB = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Delete Successfully",
            data: await academicDepartmentService.deleteFromDB(id)
        })
    }
)


export const academicDepartmentController = {
    createDepartment,
    getById,
    getAll,
    fetchAndUpdate,
    deleteFromDB
}