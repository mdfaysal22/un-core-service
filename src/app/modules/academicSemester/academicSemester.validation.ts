import { z } from "zod";

const academicSemesterCreate = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is Required"
        }),
        year: z.string({
            required_error: "Year is Required",
        }),
        code : z.string({
            required_error: "Code is Required"
        }),
        startMonth: z.string({
            required_error: "StartMonth is Required"
        }),
        endMonth: z.string({
            required_error: "EndMonth is Required"
        })
    })
});


const academicSemesterUpdate = z.object({
    body: z.object({
        title: z.string().optional(),
        year: z.string().optional(),
        code : z.string().optional(),
        startMonth: z.string().optional(),
        endMonth: z.string().optional()
    })
});

export const academicSemesterValidation = {
    academicSemesterCreate,
    academicSemesterUpdate
}