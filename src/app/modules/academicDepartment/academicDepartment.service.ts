import { AcademicDepartment } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { ISearchingOptions } from "./academicDepartment.interface";

const createDepartment = async (data: AcademicDepartment): Promise<AcademicDepartment | null> => {
    const result = await prisma.academicDepartment.create({
        data,
        include: {
            academicFaculty: true
        }
    });

    return result;
};



const getAll = async (
    searchOptions: ISearchingOptions,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[] | null>> => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
    const result = await prisma.academicDepartment.findMany({
        where: {
            title: {
                contains: searchOptions?.searchTerm,
                mode: 'insensitive'
            }
        },
        skip,
        include: {
            academicFaculty: true
        },
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.academicDepartment.count();

    return {
        data: result,
        meta: {
            total,
            page,
            limit
        }
    }
}


const getById = async (id: string): Promise<AcademicDepartment | null> => {
    const result = await prisma.academicDepartment.findUnique({
        where: {
            id
        },
        include: {
            academicFaculty: true
        }
    });

    return result;
};

const fetchAndUpdate = async(id:string, payload:Partial<AcademicDepartment>) : Promise<Partial<AcademicDepartment | null>> => {
    const result = await prisma.academicDepartment.update({
        where: {
            id
        },
        data: payload,
        include: {
            academicFaculty: true
        }
    });

    return result
}

const deleteFromDB = async(id:string) : Promise<AcademicDepartment> => {
    return await prisma.academicDepartment.delete({
        where: {
            id
        },
        include: {
            academicFaculty: true
        }
    })
}

export const academicDepartmentService = {
    createDepartment,
    getById,
    getAll,
    fetchAndUpdate,
    deleteFromDB
};

