import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

var classData = JSON.parse(localStorage.getItem("Classroom"));
var classroom = classroom = loadJSONClassroom(classData);

document.getElementById("nameStudentAddCalifications").value = localStorage.getItem("CurrentStudent");
document.getElementById("nameSubjectAddCalifications").value = localStorage.getItem("CurrentSubject")


document.getElementById("buttonAddCalifications").addEventListener('click', function () {
    var student = document.getElementById("nameStudentAddCalifications").value;
    var subjectName = document.getElementById("nameSubjectAddCalifications").value;
    var califications = document.getElementById("calificationsAddCalifications").value;
    var arrayCalifications = califications.split(",");

    var success = classroom.addCalificationsToStudent(student, subjectName, arrayCalifications);
    if(success){
        localStorage.setItem("Classroom", JSON.stringify(classroom));
        localStorage.setItem("CurrentStudent", "");
        localStorage.setItem("CurrentSubject", "");

        document.location.href = "../index.html";
    }
    
});