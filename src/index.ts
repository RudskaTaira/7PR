import { UniversityManagementSystem } from "./classes/UniversityManagementSystem";
import { StudentStatus } from "./enums/StudentStatus";
import { CourseType } from "./enums/CourseType";
import { Grade } from "./enums/Grade";
import { Faculty } from "./enums/Faculty";
import { Semester } from "./enums/Semester";

// Initialize the system
const ums = new UniversityManagementSystem();

// Enroll students
const student1 = ums.enrollStudent({
    fullName: "John Doe",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS101"
});
const student2 = ums.enrollStudent({
    fullName: "Jane Smith",
    faculty: Faculty.Economics,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "EC202"
});

// Create courses
const course1 = ums["courses"].push({
    id: 1,
    name: "Introduction to Computer Science",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});
const course2 = ums["courses"].push({
    id: 2,
    name: "Macroeconomics 101",
    type: CourseType.Mandatory,
    credits: 3,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 25
});

// Register students for courses
ums.registerForCourse(student1.id, course1.id);
ums.registerForCourse(student2.id, course2.id);

// Set grades
ums.setGrade(student1.id, course1.id, Grade.Excellent);
ums.setGrade(student2.id, course2.id, Grade.Good);

// Update student status
ums.updateStudentStatus(student1.id, StudentStatus.Graduated);

// Fetch and display results
console.log("Students in Computer Science:", ums.getStudentsByFaculty(Faculty.Computer_Science));
console.log("Grades of John Doe:", ums.getStudentGrades(student1.id));
console.log("Average grade of Jane Smith:", ums.calculateAverageGrade(student2.id));
