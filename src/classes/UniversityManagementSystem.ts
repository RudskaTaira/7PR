import { Student } from "../interfaces/Student";
import { Course } from "../interfaces/Course";
import { GradeRecord } from "../interfaces/GradeRecord";
import { StudentStatus } from "../enums/StudentStatus";
import { Faculty } from "../enums/Faculty";
import { Grade } from "../enums/Grade";
import { Semester } from "../enums/Semester";

export class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private studentIdCounter = 1;
    private courseRegistrations: Map<number, Set<number>> = new Map();

    /**
     * Enrolls a new student and generates a unique ID.
     */
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { ...student, id: this.studentIdCounter++ };
        this.students.push(newStudent);
        return newStudent;
    }

    /**
     * Registers a student for a course, ensuring faculty match and available slots.
     */
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) throw new Error("Student or Course not found");
        if (student.faculty !== course.faculty) throw new Error("Faculty mismatch");

        const registrations = this.courseRegistrations.get(courseId) || new Set();
        if (registrations.size >= course.maxStudents) throw new Error("Course is full");

        registrations.add(studentId);
        this.courseRegistrations.set(courseId, registrations);
    }

    /**
     * Assigns a grade to a student for a course.
     */
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        const registrations = this.courseRegistrations.get(courseId);
        if (!registrations || !registrations.has(studentId)) throw new Error("Student not registered for this course");

        const course = this.courses.find(c => c.id === courseId);
        if (!course) throw new Error("Course not found");

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        });
    }

    /**
     * Updates a student's status, ensuring valid transitions.
     */
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found");

        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error("Cannot change status of a graduated or expelled student");
        }

        student.status = newStatus;
    }

    /**
     * Returns students filtered by faculty.
     */
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    /**
     * Retrieves all grades for a specific student.
     */
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    /**
     * Fetches courses available for a faculty in a given semester.
     */
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    /**
     * Calculates the average grade of a student.
     */
    calculateAverageGrade(studentId: number): number {
        const grades = this.getStudentGrades(studentId).map(g => g.grade);
        if (grades.length === 0) return 0;

        const sum = grades.reduce((a, b) => a + b, 0);
        return sum / grades.length;
    }

    /**
     * Finds students with excellent grades in a faculty.
     */
    getExcellentStudentsByFaculty(faculty: Faculty): Student[] {
        const excellentStudentIds = new Set(
            this.grades
                .filter(g => g.grade === Grade.Excellent)
                .map(g => g.studentId)
        );

        return this.students.filter(s => s.faculty === faculty && excellentStudentIds.has(s.id));
    }
}
