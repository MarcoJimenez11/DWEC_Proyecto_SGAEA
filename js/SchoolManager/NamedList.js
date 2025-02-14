/**
 * Objeto con un nombre y una lista de elementos
 */
export class NamedList {
    #name;
    #elements;
    /**
     * Crea una lista con nombre
     * @param {String} name - El nombre de la lista
     * @param {Object[]} elements - Array de elementos que contendrá la lista 
     */
    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }

    /**
     * Añade un elemento a la lista
     * @param {Object} element - Elemento que será añadido a la lista
     */
    addElement(element) {
        this.elements.push(element);
    }

    /**
     * Elimina un elemento de la lista según el nombre del elemento
     * @param {String} nameElement - El nombre del elemento que se desea borrar
     * @returns {Boolean} - Estado de la operación (true si se ha añadido satisfactoriamente, false de lo contrario)
     */
    removeElement(nameElement) {
        var element = this.elements.find(({ name }) => name === nameElement);
        let index = this.elements.indexOf(element);
        if (index !== -1) {
            this.elements.splice(index, 1);
            console.log(`Se ha eliminado a ${nameElement}`);
            return true;
        } else {
            console.log(`No se ha encontrado ningún elemento llamado ${nameElement}`);
            return false;
        }
    }

    /**
     * Busca elementos del array que contengan el string dado por parámetro (ignorando mayúsculas y minúsculas).
     * @param {String} elementName - Texto que debe contener los elementos de la lista para ser filtrados y devueltos
     * @returns {*} - La lista de elementos filtrados si se ha añadido satisfactoriamente, false de lo contrario
     */
    searchElement(elementName) {
        if (elementName == null)
            elementName = "";
        var filteredElements = this.elements.filter(({ name }) => name.toLowerCase().includes(elementName.toLowerCase()));
        if (filteredElements.length > 0) {
            return filteredElements;
        } else {
            console.log(`No existen elementos que contengan ${elementName}`);
            return false;
        }
    }

    /**
     * Devuelve el nombre de esta lista
     * @returns {String} - El nombre de la lista
     */
    getName() {
        return this.name;
    }

    /**
     * Devuelve la lista de elementos de este objeto
     * @returns {Object[]} - La lista de elementos
     */
    getElements() {
        return this.elements;
    }

    /**
     * Devuelve la cantidad de elementos que hay en la lista de objetos
     * @returns {Number} - Cantidad de elementos en la lista
     */
    getCountElements() {
        return this.elements.length;
    }

    /**
     * Crea una tabla HTML de forma dinámica
     */
    createTable() {
        if (this.elements != null && this.elements.length > 0) {
            const section = document.getElementById("rightSection");
            const previousTable = document.getElementById("studentTable");
            if (previousTable != null) previousTable.remove();
            const tbl = document.createElement("table");
            tbl.setAttribute("id", "studentTable");
            tbl.setAttribute("class", "studentTable");
            const tr = tbl.insertRow();
            Object.keys(this.elements[0]).forEach(val => {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(val.toString()));
            });
            this.elements.forEach(element => {
                const tr = tbl.insertRow();
                Object.values(element).forEach(val => {
                    const td = tr.insertCell();
                    td.appendChild(document.createTextNode(val.toString()));
                });
            });
            section.appendChild(tbl);
        }
    }
}
