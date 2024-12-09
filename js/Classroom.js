import { NamedList } from './NamedList.js';

//Lista de estudiantes
export class Classroom extends NamedList {

    //Añade estudiante al aula, comprobando que el nombre del estudiante sólo contenga letras (con o sin tilde) y espacios en blanco y
    //que no haya duplicados según el nombre de estudiante
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

    //Añade matrícula a un estudiante dados por parámetro, comprobando que la asignatura de la matrícula contenga sólo letras,
    //números romanos o espaciose en blanco
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

    //Añade un array de notas a la asignatura del estudiante dados por parámetro, comprobando que las notas sean números entre 0 y 10
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

    //Comprueba que los elementos del array dado por parámetro sean números enteros entre 0 y 10
    checkCalifications(arrayCalifications) {
        var validCalifications = true;
        arrayCalifications.forEach(calification => {
            if (parseInt(calification) < 0 || parseInt(calification) > 10 || parseFloat(calification) % 1 != 0 || isNaN(parseInt(calification))) {
                validCalifications = false;
            }
        });
        return validCalifications;
    }

    //Desmatricula un estudiante en una asignatura y fecha dadas por parámetro
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

    //Borra la matrícula del estudiante dados por parámetro
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


    //Devuelve la media de todos los estudiantes que contengan en su nombre el filtro dado por parámetro
    getAverageStudents(filter) {
        var students = this.searchElement(filter);
        var avg = 0;
        students.forEach(val => {
            avg += parseInt(val.getAverage());
        });
        avg /= students.length;
        return parseInt(avg);
    }


    //Muestra por consola todos los estudiantes
    logAllStudents() {
        this.elements.forEach(element => {
            console.log(element.toString());
        });
    }

    //Crea una tabla HTML que muestra los datos de los estudiantes que contengan el filtro dado por parámetro
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

    //Crea una tabla con las notas de los estudiantes de la asignatura indicada por el filtro
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
