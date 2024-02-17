import { z } from "zod";

const createStudentValidation = z.object({
    body: z.object({
        studentId: z.string({
            required_error: "student id is required",
        }),
        firstName: z.string({
            required_error: "First Name required"
        }),

        middleName: z.string().optional(),
        lastName: z.string({
            required_error: "Last Name required"
        }),

        profileImage: z.string({
            required_error: "Profile Image required"
        }),
        email: z.string({
            required_error: "Email required"
        }),

        contactNo: z.string({
            required_error: "Contact No required"
        }),
        gender: z.string({
            required_error: "Gender required"
        }),

        bloodGroup: z.string({
            required_error: "Blood Group required"
        }),
        academicSemesterId: z.string({
            required_error: "Academic Semester Id required"
        }),
        academicDepartmentId : z.string({
            required_error: "Academic Department Id required"
        }),
        academicFacultyId : z.string({
            required_error: "Academic Department Id required"
        })
    })
});


const updateStudent = z.object({
    body: z.object({
        studentId: z.string().optional(),
        firstName: z.string().optional(),

        middleName: z.string().optional(),
        lastName: z.string().optional(),

        profileImage: z.string().optional(),
        email: z.string().optional(),

        contactNo: z.string().optional(),
        gender: z.string().optional(),

        bloodGroup: z.string().optional(),
        academicSemesterId: z.string().optional(),
        academicDepartmentId : z.string().optional(),
        academicFacultyId : z.string().optional()
    })
})


export const studentValidation  = {
    createStudentValidation,
    updateStudent
}