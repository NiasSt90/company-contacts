import {observable, computed, decorate} from 'mobx'
import {Address} from "./Address";
import {InsuranceClass} from "./InsuranceClass";

export class Insurer {

    //unique ID for this entry
    id

    //name of the insurer
    /*@observable*/ name = ''

    address = new Address();

    insuranceClasses = []

    hints = ''

    imgDataURL

    constructor(name) {
        this.name = name;
    }

    addInsuranceClass(name) {
        if (this.insuranceClasses.filter(insuranceClass => insuranceClass.className === name).length === 0) {
            this.insuranceClasses.push(new InsuranceClass(name))
        }
    }

    delInsuranceClass(clazz) {
        this.insuranceClasses = this.insuranceClasses.filter(x => x !== clazz);
    }


    // this two methods will serialize and deserialize the insurer
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    serialize(){
        return {
            id: this.id,
            name: this.name,
            hints: this.hints,
            imgDataURL: this.imgDataURL,
            address: this.address.serialize(),
            insuranceClasses: this.insuranceClasses.map(insuranceClass => insuranceClass.serialize()),
        }
    }
    static deserialize(json){
        const insurer = new Insurer()
        insurer.id = json['id']
        insurer.name = json['name'] || ''
        insurer.hints = json['hints'] || ''
        insurer.imgDataURL = json['imgDataURL'] || ''
        insurer.address = Address.deserialize(json['address'])
        insurer.insuranceClasses = json['insuranceClasses'] ? json['insuranceClasses'].map(insuranceClass => InsuranceClass.deserialize(insuranceClass)) : []
        return insurer
    }
}

decorate(Insurer, {
    name: observable,
    hints: observable,
    insuranceClasses: observable,
})
