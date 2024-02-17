import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { facultyService } from "./faculty.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const result = await facultyService.create(data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Faculty created successfully",
            data : result
        });
    }
);

const fetchAll = catchAsync(
    async(req:Request, res: Response) => {
        const paginationOption = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
        const searchableData = pick(req.query, ["searchTerm", "gender", "bloodGroup", "designation", "academicDepartmentId", "academicFacultyId"])
        const result = await facultyService.fetchAll(paginationOption, searchableData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'faculty fetch successfully',
            data: result.data,
            meta: result.meta
        })
    }
)

const fetchById = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;
        const result = await facultyService.fetchById(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Faculty fetch by ${id}`,
            data : result
        });

    }
)

const fetchAndUpdate = catchAsync(
    async(req:Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        const result = await facultyService.fetchAndUpdate(id, data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Faculty Update successful",
            data: result
        })
    }
)

const deleteFromDB = catchAsync(
    async(req:Request, res:Response) => {
        const id = req.params.id;
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Faculty Delete Success",
            data: await facultyService.deleteFromDB(id)
        })
    }
)

export const facultyController = {
    create,
    fetchById,
    fetchAll,
    fetchAndUpdate,
    deleteFromDB
}