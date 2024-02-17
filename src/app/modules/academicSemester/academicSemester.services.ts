/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicSemesterFilterableField } from "./academicSemester.types";
import { academicSemesterConst } from "./academicSemester.const";
import prisma from "../../../shared/prisma";



const insertIntoDb = async (data: AcademicSemester): Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.create({
        data
    });

    return result
};


const getAll = async (
    paginationOptions: IPaginationOptions,
    filters: IAcademicSemesterFilterableField
): Promise<IGenericResponse<AcademicSemester[] | null>> => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, ...filterData } = filters;
    const andCondition = [];

    if (searchTerm) {
        andCondition.push({
            OR: academicSemesterConst.searchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if(Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AcademicSemesterWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const result = await prisma.academicSemester.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy : sortBy && sortOrder ? {
            [sortBy] : sortOrder
        } :  {
            createAt: 'desc'
        }
    });
    const total = await prisma.academicSemester.count();


    return {
        meta: {
            page,
            limit,
            total: total
        },
        data: result
    }
}

const getById = async(id:string) : Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.findUnique({
        where: {
            id
        }
    });

    return result
}

const fetchAndUpdate = async(id:string, payload:Partial<AcademicSemester>) : Promise<Partial<AcademicSemester>> => {
    const result = await prisma.academicSemester.update({
        where: {
            id
        },
        data: payload
    });


    return result
}


const deleteFromDB = async(id:string) => {
    return await prisma.academicSemester.delete({
        where: {
            id
        }
    })
}

export const academicSemesterServices = {
    insertIntoDb,
    getAll,
    getById,
    fetchAndUpdate,
    deleteFromDB
}