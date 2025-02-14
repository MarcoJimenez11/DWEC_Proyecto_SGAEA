import { Direction } from '../SchoolManager/Direction.js';
import { Classroom } from '../SchoolManager/Classroom.js';
import { Student } from '../SchoolManager/Student.js';
import { Tuition } from '../SchoolManager/Tuition.js';
import { loadJSONClassroom } from '../jsonManager.js';

var classData = JSON.parse(localStorage.getItem("Classroom"));
var classroom = classroom = loadJSONClassroom(classData);


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

    var success = classroom.addElement(new Student(student, age, direction));

    if(success){
        localStorage.setItem("Classroom", JSON.stringify(classroom));
        localStorage.setItem("CurrentStudent", student);
        document.location.href = "addSubject.html";
    }
    
});