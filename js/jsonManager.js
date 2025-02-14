import { Direction } from './SchoolManager/Direction.js';
import { Classroom } from './SchoolManager/Classroom.js';
import { Student } from './SchoolManager/Student.js';
import { Tuition } from './SchoolManager/Tuition.js';

export function loadJSONClassroom(classroom) {
    var classData = JSON.parse(localStorage.getItem("Classroom"));

    console.log(classData);
    classroom = new Classroom(classData.name, []);

    classData.elements.forEach(student => {
        var direction = new Direction(student.direction.road, student.direction.number, student.direction.floor, student.direction.postcode, student.direction.province, student.direction.locality);
        
        classroom.addElement(new Student(student.name, student.age, direction));
        
        student.elements.forEach(tuition => {
            classroom.addTuitionToStudent(student.name, new Tuition(tuition.name, tuition.registerDate));
            classroom.addCalificationsToStudent(student.name, tuition.name, tuition.elements);
        });

    });

    return classroom;
}