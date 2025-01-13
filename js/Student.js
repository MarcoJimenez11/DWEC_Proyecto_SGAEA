import { NamedList } from './NamedList.js';


/**
 * @class
 * @description Estudiante con lista de matrículas asignadas
 * @extends NamedList
 */
export class Student extends NamedList {
    #id;
    #age;
    #direction;
    /**
     * @constructor
     * @description Crea un estudiante con su nombre, edad y dirección
     * @param {String} name - El nombre del estudiante
     * @param {Number} age - La edad del estudiante
     * @param {Direction} direction - La dirección de la vivienda del estudiante
     */
    constructor(name, age, direction) {
        super(name, []);
        this.age = age;
        this.direction = direction;
    }

    /**
     * @description Devuelve el identificador del estudiante
     * @returns {Number} - El identificador del estudiante
     */
    getId() {
        return this.id;
    }

    /**
     * @description Devuelve la edad del estudiante
     * @returns {Number} - La edad del estudiante
     */
    getAge() {
        return this.age;
    }

    /**
     * @description Devuelve la dirección del estudiante
     * @returns {Direction} - La dirección del estudiante
     */
    getDirection() {
        return this.direction;
    }

    /**
     * @description Añade matrícula al alumno, comprobando que no esté ya matriculado en esa asignatura
     * @param {Tuition} tuition - La matrícula que se añadirá a la lista de matrículas de este estudiante
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
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

    /**
     * @description Añade notas a una asignatura dadas por parámetro
     * @param {String} subjectName - El nombre de la asignatura a la que se añadirán las notas
     * @param {Number[]} arrayCalifications - Array de notas que se añadirán a la asignatura dada
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
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

    
    /**
     * @description Desmatricula al alumno en la asignatura y fecha indicadas por parámetro
     * @param {String} nameTuition - Nombre de la asignatura de la que se quiere desmatricular
     * @param {Date} cancelDate - Fecha que constará como fecha de desmatriculación
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
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

    /**
     * @description Establece un nuevo identificador al estudiante
     * @param {Number} id - El nuevo identificador para el estudiante
     */
    setID(id) {
        this.id = id;
    }

    
    /**
     * @description Devuelve la media total de la media de cada asignatura que contenga el filtro indicado por parámetro
     * @param {String} filter - Cadena de texto que deberán contener las asignaturas en las que esté matriculado el estudiante
     * @returns {Number} - La media total de cada media de todas las asignaturas que cumplen el filtro dado
     */
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

    /**
     * @description Devuelve un texto con una breve descripción del estudiante según sus atributos
     * @returns {String} - El texto que describe los atributos del estudiante
     */
    toString() {
        return `${this.id} -> ${this.name} (${this.age} años) ${this.direction.toString()} \n ${this.elements}`;
    }

    
    /**
     * @description Crea una tabla HTML que muestra las asignaturas que contengan el filtro dado por parámetro y sus notas y media
     * @param {String} filter - Cadena de texto que deberán contener las asignaturas en las que esté matriculado el estudiante para filtrar
     */
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
