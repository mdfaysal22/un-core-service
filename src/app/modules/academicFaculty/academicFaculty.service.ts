import { AcademicFaculty } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IAcademicFacultySearchableField } from "./academicFaculty.interface";

const createFaculty = async (data: AcademicFaculty) : Promise<AcademicFaculty | null> => {
    const result = await prisma.academicFaculty.create({
        data
    });

    return result
};




const getAll = async (searchTerm : IAcademicFacultySearchableField , options : IPaginationOptions): Promise<IGenericResponse<AcademicFaculty[] | null>> =>  {
    const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(options);
    const result = await prisma.academicFaculty.findMany({
        where: {
            title : {
                contains: searchTerm?.searchTerm,
                mode: 'insensitive'
            }
        },
        skip,
        take: limit,
        orderBy:  {
            [sortBy] : sortOrder
        } 
    });

    const total = await prisma.academicFaculty.count();


    return {
        data: result,
        meta: {
            page,
            limit,
            total
        }
    }
}

const getById = async(id: string) : Promise<AcademicFaculty | null> => {
    const result = await prisma.academicFaculty.findUnique({
        where: {
            id
        }
    });
    return result
}


const fetchAndUpdate = async(id:string, data: Partial<AcademicFaculty>) : Promise<Partial<AcademicFaculty | null>> => {
    const result = await prisma.academicFaculty.update({
        where: { id: id},
        data
    });

    return result
}
const deleteFromDB = async(id:string) : Promise<AcademicFaculty> => {
    return await prisma.academicFaculty.delete({
        where: {
            id
        }
    });
}
export const academicFacultyService = {
    createFaculty,
    getAll,
    getById,
    fetchAndUpdate,
    deleteFromDB
}