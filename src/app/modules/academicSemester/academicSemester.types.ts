export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemesterFilterableField = {
  searchTerm? : string
}