import { z } from "zod";

const createDepartment  = z.object({
    body: z.object({
        title: z.string({
            required_error: "Please enter a title"
        }),
        academicFacultyId : z.string({
            required_error: "Please enter an Academic Faculty ID"
        })
    })
});

const updateDepartment  = z.object({
    body: z.object({
        title: z.string().optional(),
        academicFacultyId : z.string().optional()
    })
});

export const academicDepartmentValidation = {
    createDepartment,
    updateDepartment
}