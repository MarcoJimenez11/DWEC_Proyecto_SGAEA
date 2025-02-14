import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

const subjects = ["Física", "Matemáticas IV", "Matemáticas V", "Matemáticas VI", "Inglés", "Lengua VI", "Lengua VII", "Sociales", "Historia", "Química", "Francés"];
var classData = JSON.parse(localStorage.getItem("Classroom"));
var classroom = classroom = loadJSONClassroom(classData);

document.getElementById("nameStudentAddSubject").value = localStorage.getItem("CurrentStudent");

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
var selectAdd = document.getElementById("nameSubjectAddSubject");
createDropdownSubjects(selectAdd);


document.getElementById("buttonAddSubject").addEventListener('click', function () {
    var student = document.getElementById("nameStudentAddSubject").value;
    var subjectName = document.getElementById("nameSubjectAddSubject").value;
    var tuitionDate = document.getElementById("dateAddSubject").value;

    var subject = new Tuition(subjectName, tuitionDate);
    var success = classroom.addTuitionToStudent(student, subject);

    if(success){
        localStorage.setItem("Classroom", JSON.stringify(classroom));
        localStorage.setItem("CurrentSubject", subjectName);
        document.location.href = "addCalifications.html";
    }
    
});