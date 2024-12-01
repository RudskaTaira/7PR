import { Faculty } from "../enums/Faculty";
import { StudentStatus } from "../enums/StudentStatus";

export interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}
