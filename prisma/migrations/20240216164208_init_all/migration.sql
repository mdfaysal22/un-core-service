/*
  Warnings:

  - You are about to drop the column `studentId` on the `students` table. All the data in the column will be lost.
  - Changed the type of `gender` on the `faculties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `students` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "studentId",
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AcademicSemesterTitle";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Months";
