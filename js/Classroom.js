import { NamedList } from './NamedList.js';

/**
 * @class
 * @description Lista de alumnos que obtiene de la herencia de NamedList los atributo de nombre y lista de elementos (estudiantes)
 * @extends NamedList
 */
export class Classroom extends NamedList {

    /**
     * @description Añade estudiante al aula, comprobando que el nombre del estudiante sólo contenga letras (con o sin tilde) y espacios en blanco y que no haya duplicados según el nombre de estudiante
     * @param {Student} student - Estudiante para añadir al aula
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */

    addElement(student) {
        if (/^[a-zA-ZÀ-ú][a-zA-ZÀ-ú\s]*$/.test(student.getName())) {
            var element = this.elements.find(({ name }) => name === student.getName());
            let index = this.elements.indexOf(element);
            if (index == -1) {
                student.setID(this.getCountElements());
                this.elements.push(student);
                console.log(`Se añade al alumno ${student.getName()} en la clase ${this.name}`);
                return true;
            } else {
                console.log(`Ya existe el alumno ${student.getName()} en la clase ${this.name}`);
                return false;
            }
        } else {
            console.log("El nombre del estudiante sólo puede contener letras o espacios en blanco");
            return false;
        }

    }

    /**
     * @description Añade matrícula a un estudiante dados por parámetro, comprobando que la asignatura de la matrícula contenga sólo letras, números romanos o espaciose en blanco
     * @param {String} studentName - Nombre del estudiante al que se quiere añadir la matrícula
     * @param {Tuition} tuition - Matrícula a añadir para el estudiante
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */

    addTuitionToStudent(studentName, tuition) {
        var student = this.elements.find(({ name }) => name === studentName);
        let index = this.elements.indexOf(student);
        if (index !== -1) {
            if (/^[a-zA-ZÀ-ú][a-zA-ZÀ-ú\s]*$/.test(tuition.getName())) {
                if (student.addElement(tuition)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.log("El nombre de la asignatura sólo puede contener letras, números romanos o espacios en blanco");
                return false;
            }

        } else {
            console.log(`El alumno ${studentName} no existe`);
            return false;
        }
    }

    /**
     * @description Añade un array de notas a la asignatura del estudiante dados por parámetro, comprobando que las notas sean números entre 0 y 10
     * @param {String} studentName - Nombre del estudiante al que añadir las notas
     * @param {String} subjectName - Nombre de la asignatura de la cual son las notas
     * @param {Number[]} califications - Array de notas a añadir
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
    addCalificationsToStudent(studentName, subjectName, califications) {
        var student = this.elements.find(({ name }) => name === studentName);
        let index = this.elements.indexOf(student);
        if (index !== -1) {
            if (this.checkCalifications(califications)) {
                if (student.addCalifications(subjectName, califications)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.log(`Las notas deben ser números entre 0 y 10`);
            }

        } else {
            console.log(`El alumno ${studentName} no existe`);
            return false;
        }
    }

    /**
     * @description Comprueba que los elementos del array dado por parámetro sean números enteros entre 0 y 10
     * @param {Number[]} arrayCalifications - Array de notas para evaluar si su formato es correcto
     * @returns {Boolean} Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
    checkCalifications(arrayCalifications) {
        var validCalifications = true;
        arrayCalifications.forEach(calification => {
            if (parseInt(calification) < 0 || parseInt(calification) > 10 || !/^\d+$/.test(calification)) {
                validCalifications = false;
            }
        });
        return validCalifications;
    }

    /**
     * @description Desmatricula un estudiante en una asignatura y fecha dadas por parámetro
     * @param {String} studentName - Nombre del estudiante al que desmatricular
     * @param {String} tuitionName - Nombre de la asignatura que se desmatriculará del estudiante
     * @param {Date} cancelDate - Fecha que constará como fecha de desmatriculación
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
    cancelTuitionToStudent(studentName, tuitionName, cancelDate) {
        var student = this.elements.find(({ name }) => name === studentName);
        let index = this.elements.indexOf(student);
        if (index !== -1) {
            if (student.cancelTuition(tuitionName, cancelDate)) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    /**
     * @description Borra la matrícula del estudiante dados por parámetro
     * @param {String} studentName - Nombre del estudiante al que se le eliminará la matrícula
     * @param {String} tuitionName - Nombre de la matrícula que se eliminará del estudiante
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
    removeTuitionToStudent(studentName, tuitionName) {
        var student = this.elements.find(({ name }) => name === studentName);
        let index = this.elements.indexOf(student);
        if (index !== -1) {
            if (student.removeElement(tuitionName)) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    /**
     * @description Devuelve la media de todos los estudiantes que contengan en su nombre el filtro dado por parámetro
     * @param {String} filter - Cadena de texto que se aplica como filtro para extraer todos los estudiantes que la contengan
     * @returns {Number} - La media aritmética de todas las medias de notas de la lista de estudiantes obtenida con el filtro
     */
    getAverageStudents(filter) {
        var students = this.searchElement(filter);
        var avg = 0;
        students.forEach(val => {
            avg += parseInt(val.getAverage());
        });
        avg /= students.length;
        return parseInt(avg);
    }

    /**
     * @description Muestra por consola todos los estudiantes
     */
    logAllStudents() {
        this.elements.forEach(element => {
            console.log(element.toString());
        });
    }

    /**
     * @description Crea una tabla HTML que muestra los datos de los estudiantes que contengan el filtro dado por parámetro
     * @param {String} filter - Cadena de texto que se aplica como filtro para extraer todos los estudiantes que la contengan
     */
    createTable(filter) {
        var students = this.searchElement(filter);
        if (students != null && students.length > 0) {
            const section = document.getElementById("rightSection");
            const previousTable = document.getElementById("studentTable");
            if (previousTable != null) previousTable.remove();

            const tbl = document.createElement("table");
            tbl.setAttribute("id", "studentTable");
            tbl.setAttribute("class", "studentTable");

            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("ID"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Nombre"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Edad"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Localidad"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Media"));
            td.setAttribute("class", "tableHeader");

            students.forEach(element => {
                const tr = tbl.insertRow();
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getId()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getName()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getAge()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getDirection().getLocality()));
                td = tr.insertCell();
                td.appendChild(document.createTextNode(element.getAverage()));
            });

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Media total"));
            td.colSpan = "4";
            td.setAttribute("id", "totalAverage");
            td = tr.insertCell();
            td.appendChild(document.createTextNode(this.getAverageStudents(filter)));

            section.appendChild(tbl);
        }
    }

    /**
     * @description Crea una tabla HTML con las notas de los estudiantes de la asignatura indicada por el filtro
     * @param {String} filter - Cadena de texto que se aplica como filtro para extraer todos los estudiantes que la contengan
     */
    createTableSubjects(filter) {

        if (this.elements != null && this.elements.length > 0) {
            const section = document.getElementById("rightSection");
            const previousTable = document.getElementById("studentTable");
            if (previousTable != null) previousTable.remove();

            const tbl = document.createElement("table");
            tbl.setAttribute("id", "studentTable");
            tbl.setAttribute("class", "studentTable");

            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Nombre"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Asignatura"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Notas"));
            td.setAttribute("class", "tableHeader");
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Media"));
            td.setAttribute("class", "tableHeader");

            this.elements.forEach(student => {
                var subjects = student.searchElement(filter);
                if (subjects != null && subjects.length > 0) {
                    subjects.forEach(subject => {
                        const tr = tbl.insertRow();
                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode(student.getName()));
                        td = tr.insertCell();
                        td.appendChild(document.createTextNode(subject.getName()));
                        td = tr.insertCell();
                        td.appendChild(document.createTextNode(subject.getElements().toString()));
                        td = tr.insertCell();
                        td.appendChild(document.createTextNode(subject.getAverage()));
                    });

                }

            });

            section.appendChild(tbl);
        }
    }
}
