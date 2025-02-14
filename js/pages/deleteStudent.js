import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

var classData = JSON.parse(localStorage.getItem("Classroom"));
var classroom = classroom = loadJSONClassroom(classData);

document.getElementById("buttonRemove").addEventListener('click', function () {
    var student = document.getElementById("nameRemoveStudent").value;
    classroom.removeElement(student);
    localStorage.setItem("Classroom", JSON.stringify(classroom));
});