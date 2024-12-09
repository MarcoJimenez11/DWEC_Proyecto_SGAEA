export class Direction {
    #road;
    #number;
    #floor;
    #postcode;
    #province;
    #locality;
    constructor(road, number, floor, postcode, province, locality) {
        this.road = road;
        this.number = number;
        this.floor = floor;
        this.postcode = postcode;
        this.province = province;
        this.locality = locality;
    }

    getRoad() {
        return this.road;
    }

    getNumber() {
        return this.number;
    }

    getFloor() {
        return this.floor;
    }

    getPostcode() {
        return this.postcode;
    }

    getProvince() {
        return this.province;
    }

    getLocality() {
        return this.locality;
    }

    toString() {
        return `Calle: ${this.road} Nº ${this.number} Piso ${this.floor} Código postal ${this.postcode} Provincia ${this.province} Localidad ${this.locality}`
    }
}
