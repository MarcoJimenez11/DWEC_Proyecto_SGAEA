/**
 * @class
 * @description Dirección de vivienda de una persona
 */
export class Direction {
    #road;
    #number;
    #floor;
    #postcode;
    #province;
    #locality;
    /**
     * @constructor
     * @description Crea una dirección
     * @param {String} road - Nombre de calle de la vivienda
     * @param {Number} number - Número de la vivienda
     * @param {Number} floor - Número de piso de la vivienda
     * @param {Number} postcode - Código postal de la vivienda
     * @param {String} province - Provincia en la que se ubica la vivienda
     * @param {String} locality - Localidad en la que se ubica la vivienda
     */
    constructor(road, number, floor, postcode, province, locality) {
        this.road = road;
        this.number = number;
        this.floor = floor;
        this.postcode = postcode;
        this.province = province;
        this.locality = locality;
    }

    /**
     * @description Devuelve la calle de la dirección
     * @returns {String} - El nombre de la calle
     */
    getRoad() {
        return this.road;
    }

    /**
     * @description Devuelve el número de la vivienda
     * @returns {Number} - El número de la vivienda
     */
    getNumber() {
        return this.number;
    }

    /**
     * @description Devuelve el número de piso de la vivienda
     * @returns {Number} - El número de piso de la vivienda
     */
    getFloor() {
        return this.floor;
    }

    /**
     * @description Devuelve el código postal de la dirección
     * @returns {Number} - El número de código postal de la vivienda
     */
    getPostcode() {
        return this.postcode;
    }

    /**
     * @description Devuelve la provincia de la dirección
     * @returns {String} - El nombre de la provincia en la que reside la vivienda
     */
    getProvince() {
        return this.province;
    }

    /**
     * @description Devuelve la localidad de la dirección
     * @returns {String} - El nombre de la localidad en la que reside la vivienda
     */
    getLocality() {
        return this.locality;
    }

    /**
     * @description Devuelve un texto con la dirección completa
     * @returns {String} - Texto con la dirección completa en detalle
     */
    toString() {
        return `Calle: ${this.road} Nº ${this.number} Piso ${this.floor} Código postal ${this.postcode} Provincia ${this.province} Localidad ${this.locality}`
    }
}
