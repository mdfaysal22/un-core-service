import { z } from "zod";

const academicFacultyCreate = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        })
    })
});

const academicFacultyUpdate = z.object({
    body: z.object({
        title: z.string().optional()
    })
})

export const academicFacultyValidation  = {
    academicFacultyCreate,
    academicFacultyUpdate
}