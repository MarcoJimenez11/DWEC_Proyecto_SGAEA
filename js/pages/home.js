import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

const subjects = ["Física", "Matemáticas IV", "Matemáticas V", "Matemáticas VI", "Inglés", "Lengua VI", "Lengua VII", "Sociales", "Historia", "Química", "Francés"];

/**
 * Inserta datos de alumnos de prueba
 * @param {String} studentName - Nombre del estudiante a insertas
 * @param {String} locality - Localidad del estudiante
 */
function testInsertStudent(studentName, locality) {
    var direction = new Direction("Real", 1, 1, 18230, "Granada", locality);
    var randomAge = Math.floor(Math.random() * 20 + 10);
    classroom.addElement(new Student(studentName, randomAge, direction));
    //Se matricula en cada asignatura al alumno con notas aleatorias
    subjects.forEach(subject => {
        var tuition = new Tuition(subject, "2024-01-01");
        var randomCalifications = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        classroom.addTuitionToStudent(studentName, tuition);
        classroom.addCalificationsToStudent(studentName, subject, randomCalifications);
    });

    //Se desmatricula al alumno en una asignatura al azar
    classroom.cancelTuitionToStudent(studentName, subjects[Math.floor(Math.random() * subjects.length)], "2025-01-01");
}


var classroom = new Classroom("2 DAW", []);

if (localStorage.getItem("Classroom") == null) {
    testInsertStudent("Pepe García", "Atarfe");
    testInsertStudent("Juan López", "Granada");
    testInsertStudent("Jose Gutiérrez", "Granada");
    testInsertStudent("María García", "Santa Fe");
    testInsertStudent("Claudia Serrano", "Pinos Puente");
    testInsertStudent("Marta Hernández", "Santa Fe");
    testInsertStudent("Marta Pérez", "Granada");
    testInsertStudent("Pepe Segundo", "Zujaira");

    localStorage.setItem("Classroom", JSON.stringify(classroom));
} else {
    classroom = loadJSONClassroom(classroom);
}





document.getElementById("buttonTableStudents").addEventListener('click', function () {
    classroom.createTable("");
});

document.getElementById("buttonTableSubjects").addEventListener('click', function () {
    var studentName = document.getElementById("nameTuitionsStudent").value;
    var subjectName = document.getElementById("subjectTuitionsStudent").value;
    var student = classroom.searchElement(studentName);
    if (student.length > 0) {
        student[0].createTable(subjectName);
    }
});

document.getElementById("buttonSearchStudent").addEventListener('click', function () {
    var student = document.getElementById("nameSearchStudent").value;
    if (classroom.searchElement(student)) {
        classroom.createTable(student);
    }
});

document.getElementById("buttonTableCalifications").addEventListener('click', function () {
    var subjectName = document.getElementById("subjectShowCalifications").value;
    classroom.createTableSubjects(subjectName);
});