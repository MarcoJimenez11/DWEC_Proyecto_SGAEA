import { NamedList } from './NamedList.js';
import { Student } from './Student.js';
import { Direction } from './Direction.js';
import { Tuition } from './Tuition.js';
import { Classroom } from './Classroom.js';

const subjects = ["Física", "Matemáticas IV", "Matemáticas V", "Matemáticas VI", "Inglés", "Lengua VI", "Lengua VII", "Sociales", "Historia", "Química", "Francés"];

//Inserta datos de alumnos de prueba
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

const classroom = new Classroom("2 DAW", []);

testInsertStudent("Pepe García", "Atarfe");
testInsertStudent("Juan López", "Granada");
testInsertStudent("Jose Gutiérrez", "Granada");
testInsertStudent("María García", "Santa Fe");
testInsertStudent("Claudia Serrano", "Pinos Puente");
testInsertStudent("Marta Hernández", "Santa Fe");
testInsertStudent("Marta Pérez", "Granada");
testInsertStudent("Pepe Segundo", "Zujaira");

/*
    ---------------------------- DROPDOWNS
*/

//Añade las asignaturas a los desplegables del html
function createDropdownSubjects(selectDropdown) {
    for (var i = 0; i < subjects.length; i++) {
        var option = subjects[i];
        var element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectDropdown.appendChild(element);
    }
}
var selectAdd = document.getElementById("nameSubjectAddSubject");
var selectRemove = document.getElementById("nameSubjectRemoveSubject");
var selectCalificate = document.getElementById("nameSubjectAddCalifications");
createDropdownSubjects(selectAdd);
createDropdownSubjects(selectRemove);
createDropdownSubjects(selectCalificate);

/*
   ------------------  LISTENERS
*/

document.getElementById("buttonAdd").addEventListener('click', function () {
    var student = document.getElementById("nameStudent").value;
    var age = document.getElementById("ageStudent").value;
    var road = document.getElementById("roadDirection").value;
    var number = document.getElementById("numberDirection").value;
    var floor = document.getElementById("floorDirection").value;
    var postcode = document.getElementById("postcodeDirection").value;
    var province = document.getElementById("provinceDirection").value;
    var locality = document.getElementById("localityDirection").value;

    var direction = new Direction(road, number, floor, postcode, province, locality);

    classroom.addElement(new Student(student, age, direction));
});

document.getElementById("buttonRemove").addEventListener('click', function () {
    var student = document.getElementById("nameRemoveStudent").value;
    classroom.removeElement(student);
});

document.getElementById("buttonLogStudents").addEventListener('click', function () {
    classroom.logAllStudents();
});

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

document.getElementById("buttonAddSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentAddSubject").value;
    var subjectName = document.getElementById("nameSubjectAddSubject").value;
    var tuitionDate = document.getElementById("dateAddSubject").value;

    var subject = new Tuition(subjectName, tuitionDate);
    classroom.addTuitionToStudent(student, subject);

});

document.getElementById("buttonAddCalifications").addEventListener('click', function () {
    var student = document.getElementById("nameStudentAddCalifications").value;
    var subjectName = document.getElementById("nameSubjectAddCalifications").value;
    var califications = document.getElementById("calificationsAddCalifications").value;
    var arrayCalifications = califications.split(",");

    classroom.addCalificationsToStudent(student, subjectName, arrayCalifications);

});

document.getElementById("buttonCancelSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentRemoveSubject").value;
    var subjectName = document.getElementById("nameSubjectRemoveSubject").value;
    var cancelDate = document.getElementById("dateRemoveSubject").value;

    classroom.cancelTuitionToStudent(student, subjectName, cancelDate);

});

document.getElementById("buttonRemoveSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentRemoveSubject").value;
    var subjectName = document.getElementById("nameSubjectRemoveSubject").value;

    classroom.removeTuitionToStudent(student, subjectName);

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