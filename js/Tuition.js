import { NamedList } from './NamedList.js';


/**
 * Matrícula que consta de un nombre de asignatura, una lista de notas y unas fechas de matriculación y desmatriculación
 * @extends NamedList
 */
export class Tuition extends NamedList {
    #registerDate;
    #cancelDate;
    /**
     * Crea una nueva matrícula
     * @param {String} name - El nombre de la asignatura que pertenece a esta matrícula
     * @param {Date} registerDate - La fecha que constará como fecha de matriculación en la asignatura
     */
    constructor(name, registerDate) {
        super(name, []);
        this.registerDate = registerDate;
        this.cancelDate = null;
    }

    /**
     * Devuelve la fecha de matriculación en la asignatura
     * @returns {Date} - La fecha de matriculación en formato español
     */
    getRegisterDate() {
        return this.getSpanishDate(this.registerDate);
    }

    /**
     * Devuelve la fecha de desmatriculación en la asignatura
     * @returns {*} - La fecha de desmatriculación en formato español, o un texto vacío en caso de no haber fecha registrada
     */
    getCancelDate() {
        return this.cancelDate != null ? this.getSpanishDate(this.cancelDate) : "";
    }

    
    /**
     * Devuelve la fecha dada por parámetro en formato español
     * @param {Date} date - Fecha que se pretende cambiar al formato español
     * @returns {Date} - Fecha transformada al formato español
     */
    getSpanishDate(date) {
        date = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        var newDate = date.toLocaleDateString("es-ES", options);
        return newDate;
    }

    /**
     * Establece una fecha de desmatriculación a la asignatura
     * @param {Date} date - La fecha de desmatriculación
     */
    setCancelDate(date) {
        this.cancelDate = date;
    }

    
    /**
     * Calcula la media de las notas almacenadas en la matrícula
     * @returns {Number} - La nota media de las notas almacenadas en esta matrícula
     */
    getAverage() {
        var avg = 0;
        avg = this.elements.reduce((sum, value) => { return sum + value; }, 0) / this.elements.length;
        return parseInt(avg);
    }

    /**
     * Devuelve un texto con una breve descripción de la matrícula según sus atributos
     * @returns {String} - Texto con una breve descripción de la matrícula según sus atributos
     */
    toString() {
        return `${this.name} Notas: ${this.elements} Media: ${this.getAverage()}`
    }
}
