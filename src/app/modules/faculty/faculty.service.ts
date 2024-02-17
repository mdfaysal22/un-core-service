/* eslint-disable @typescript-eslint/no-explicit-any */
import { Faculty, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ISearchableFieldForFaculty } from "./faculty.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { facultyConst } from "./faculty.const";

const create = async(data: Faculty) : Promise<Faculty | null> => {
    const result = await prisma.faculty.create({
        data,
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });

    return result;
};


const fetchAll = async(paginationData : IPaginationOptions, searchableData : ISearchableFieldForFaculty) : Promise<IGenericResponse<Faculty[] | null>> => {
    const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationData);
    const {searchTerm, ...filterData} = searchableData;

    const andCondition = [];
    if(searchTerm){
        andCondition.push({
            OR: facultyConst.facultySearchableFields.map((field) => ({
                [field] : {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if(Object.keys(filterData).length > 0){
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key] : (filterData as any)[key]
            }))
        })
    };

    const whereCondition : Prisma.FacultyWhereInput = andCondition.length > 0 ? {
        AND: andCondition
    } : {}
    const result = await prisma.faculty.findMany({
        where: whereCondition,
        skip,
        take : limit,
        include: {
            academicDepartment: true,
            academicFaculty: true
        },
        orderBy: {
            [sortBy] : sortOrder
        }
    });

    const total = await prisma.faculty.count();
    return {
        data : result,
        meta : {
            total,
            page,
            limit
        }
    }
}

const fetchById = async(id:string) : Promise<Faculty | null> => {
    const result = await prisma.faculty.findUnique({
        where: {
            id
        },
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });

    return result
};

const fetchAndUpdate = async(id:string, payload: Partial<Faculty>) : Promise<Partial<Faculty | null>> => {
    const result = await prisma.faculty.update({
        where: {
            id
        },
        data: payload,
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });

    return result
}

const deleteFromDB = async(id:string) : Promise<Faculty> => {
    return await prisma.faculty.delete({
        where: {
            id
        },
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    })
}



export const facultyService = {
    create,
    fetchById,
    fetchAll,
    fetchAndUpdate,
    deleteFromDB
}