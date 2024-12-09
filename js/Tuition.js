import { NamedList } from './NamedList.js';

//Lista de notas
export class Tuition extends NamedList {
    #registerDate;
    #cancelDate;
    constructor(name, registerDate) {
        super(name, []);
        this.registerDate = registerDate;
        this.cancelDate = null;
    }

    getRegisterDate() {
        return this.getSpanishDate(this.registerDate);
    }

    getCancelDate() {
        return this.cancelDate != null ? this.getSpanishDate(this.cancelDate) : "";
    }

    //Devuelve la fecha dada por parámetro en formato español (dd-mm-yyyy)
    getSpanishDate(date) {
        date = new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;   //Comienza en 0
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '-' + mm + '-' + yyyy;
    }

    setCancelDate(date) {
        this.cancelDate = date;
    }

    //Calcula la media de las notas almacenadas en la matrícula
    getAverage() {
        var avg = 0;
        this.elements.forEach(val => {
            avg += parseInt(val);
        });
        avg /= this.elements.length;
        return parseInt(avg);
    }

    toString() {
        return `${this.name} Notas: ${this.elements} Media: ${this.getAverage()}`
    }
}
