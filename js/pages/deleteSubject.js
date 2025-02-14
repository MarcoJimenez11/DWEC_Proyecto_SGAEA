import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

const subjects = ["Física", "Matemáticas IV", "Matemáticas V", "Matemáticas VI", "Inglés", "Lengua VI", "Lengua VII", "Sociales", "Historia", "Química", "Francés"];


var classData = JSON.parse(localStorage.getItem("Classroom"));
var classroom = classroom = loadJSONClassroom(classData);

/**
 * Añade las asignaturas a los desplegables del html
 * @param {Object} selectDropdown - El desplegable en el que se insertará la lista de asignaturas
 */
function createDropdownSubjects(selectDropdown) {
    for (var i = 0; i < subjects.length; i++) {
        var option = subjects[i];
        var element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        selectDropdown.appendChild(element);
    }
}

var selectRemove = document.getElementById("nameSubjectRemoveSubject");
createDropdownSubjects(selectRemove);


document.getElementById("buttonCancelSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentRemoveSubject").value;
    var subjectName = document.getElementById("nameSubjectRemoveSubject").value;
    var cancelDate = document.getElementById("dateRemoveSubject").value;

    classroom.cancelTuitionToStudent(student, subjectName, cancelDate);

    localStorage.setItem("Classroom", JSON.stringify(classroom));
});

document.getElementById("buttonRemoveSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentRemoveSubject").value;
    var subjectName = document.getElementById("nameSubjectRemoveSubject").value;

    classroom.removeTuitionToStudent(student, subjectName);

    localStorage.setItem("Classroom", JSON.stringify(classroom));
});