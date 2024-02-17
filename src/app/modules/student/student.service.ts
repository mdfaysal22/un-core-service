/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { studentConst } from "./student.const";
import { ISearchableFieldForStudent } from "./student.interface";

const createStudent = async (data: Student): Promise<Student | null> => {
    const result = await prisma.student.create({
        data,
        include: {
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true
        }
    });

    return result
};

const getAll = async (searchableFields: ISearchableFieldForStudent, paginationOptions : IPaginationOptions): Promise<IGenericResponse<Student[] | null>> => {
    const {limit, skip, page, sortBy, sortOrder}  = paginationHelpers.calculatePagination(paginationOptions);
    const {searchTerm, ...filterableData} = searchableFields;
    const andCondition = [];

    if(searchTerm){
        andCondition.push({
            OR: studentConst.searchableFieldsData.map((field) => ({
                [field] : {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    };


    if(Object.keys(filterableData).length > 0){
        andCondition.push({
            AND: Object.keys(filterableData).map((field) => ({
                [field] : {
                    equals: (filterableData as any)[field]
                }
            }))
        })
    }

const whereCondition :Prisma.StudentWhereInput = andCondition.length > 0 ? {AND: andCondition} : {}
    const result = await prisma.student.findMany({
        where: {
            AND: whereCondition
        },
        include: {
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.student.count();

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getById = async (id: string): Promise<Student | null> => {
    const result = await prisma.student.findUnique({
        where: {
            id
        },
        include: {
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true
        }
    })

    return result
}

const fetchAndUpdate = async(id:string, payload: Partial<Student>) : Promise<Partial<Student | null>> => {
    const result = await prisma.student.update({
        where: {
            id
        },
        include: {
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true
        },
        data: payload
    });

    return result;
}

const deleteFromDB = async(id:string) : Promise<Student> => {
    return await prisma.student.delete({
        where: {id},
        include: {
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true
        }
    })
}
export const studentService = {
    createStudent,
    getAll,
    getById,
    fetchAndUpdate,
    deleteFromDB
};
