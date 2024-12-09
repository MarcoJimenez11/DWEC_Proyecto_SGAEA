import { NamedList } from './NamedList.js';

//Lista de asignaturas
export class Student extends NamedList {
    #id;
    #age;
    #direction;
    constructor(name, age, direction) {
        super(name, []);
        this.age = age;
        this.direction = direction;
    }

    getId() {
        return this.id;
    }

    getAge() {
        return this.age;
    }

    getDirection() {
        return this.direction;
    }

    //Añade matrícula al alumno, comprobando que no esté ya matriculado en esa asignatura
    addElement(tuition) {
        var element = this.elements.find(({ name }) => name === tuition.getName());
        let index = this.elements.indexOf(element);
        if (index == -1) {
            this.elements.push(tuition);
            console.log(`Se matricula al alumno ${this.name} en la asignatura ${tuition.getName()}`);
            return true;
        } else {
            console.log(`Ya está matriculado el alumno ${this.name} en la asignatura ${tuition.getName()}`);
            return false;
        }
    }

    //Añade notas a una asignatura dadas por parámetro
    addCalifications(subjectName, arrayCalifications) {
        var tuition = this.elements.find(({ name }) => name === subjectName);
        let index = this.elements.indexOf(tuition);
        if (index == -1) {
            console.log(`El alumno ${this.name} no está matriculado en la asignatura ${subjectName}`);
            return true;
        } else {
            arrayCalifications.forEach(calification => {
                tuition.addElement(calification);
            });
            console.log(`Se han añadido las notas al alumno ${this.name} en la asignatura ${subjectName}`);
            return false;
        }
    }

    //Desmatricula al alumno en la asignatura y fecha indicadas por parámetro
    cancelTuition(nameTuition, cancelDate) {
        var element = this.elements.find(({ name }) => name === nameTuition);
        let index = this.elements.indexOf(element);
        if (index !== -1) {
            element.setCancelDate(cancelDate);
            console.log(`Se ha desmatriculado el alumno ${this.name} en la asignatura ${nameTuition}`);
            return true;
        } else {
            console.log(`No está matriculado el alumno ${this.name} en la asignatura ${nameTuition}`);
            return false;
        }
    }

    setID(id) {
        this.id = id;
    }

    //Devuelve la media total de la media de cada asignatura que contenga el filtro indicado por parámetro
    getAverage(filter) {
        var subjects = this.searchElement(filter);
        var avg = 0;
        if (subjects) {
            subjects.forEach(val => {
                avg += parseInt(val.getAverage());
            });
            avg /= subjects.length;
        }
        return parseInt(avg);
    }

    toString() {
        return `${this.id} -> ${this.name} (${this.age} años) ${this.direction.toString()} \n ${this.elements}`;
    }

    //Crea una tabla HTML que muestra las asignaturas que contengan el filtro dado por parámetro y sus notas y media
    createTable(filter) {
        var subjects = this.searchElement(filter);
        if (subjects != null && subjects.length > 0) {
            const section = document.getElementById("rightSection");
            const previousTable = document.getElementById("studentTable");
            if (previousTable != null) previousTable.remove();

            const tbl = document.createElement("table");
            tbl.setAttribute("id", "studentTable");
            tbl.setAttribute("class", "studentTable");

            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(`Matrículas de ${this.getName()}`));
            td.colSpan = "5";
            td.setAttribute("class", "tableHeader");
            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Nombre"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Fecha de matrícula"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Notas"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Media"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Fecha de desmatriculación"));
            td.setAttribute("class", "tableHeader");

            subjects.forEach(element => {
                const tr = tbl.insertRow();
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getName()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getRegisterDate()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getElements().toString()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getAverage()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getCancelDate()));
            });

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Media total"));
            td.colSpan = "3";
            td.setAttribute("id", "totalAverage");
            td = tr.insertCell();
            td.appendChild(document.createTextNode(this.getAverage(filter)));
            section.appendChild(tbl);
        }
    }

}
