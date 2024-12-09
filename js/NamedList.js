//Objeto con un nombre y una lista de elementos
export class NamedList {
    #name;
    #elements;
    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }

    addElement(element) {
        this.elements.push(element);
    }

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

    //Busca elementos del array que contengan el string dado por parámetro (ignorando mayúsculas y minúsculas).
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

    getName() {
        return this.name;
    }

    getElements() {
        return this.elements;
    }

    getCountElements() {
        return this.elements.length;
    }

    //Crea una tabla HTML de forma dinámica
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
