import { Grade } from "../enums/Grade";
import { Semester } from "../enums/Semester";

export interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}
