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

    image

    // computed values are values derived and automatically updated when the observed
    // observable values changes. For example we use it to determine whenever the insurer is valid
    /*@computed*/ get isValid() {
        // a text is required
        return this.name !== ''
    }

    addInsuranceClass(name) {
        if (this.insuranceClasses.filter(insuranceClass => insuranceClass.className === name).length === 0) {
            this.insuranceClasses.push(new InsuranceClass(name))
        }
    }


    // this two methods will serialize and deserialize the insurer
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    serialize(){
        return {
            id: this.id,
            name: this.name,
            address: this.address.serialize(),
            insuranceClasses: this.insuranceClasses.map(insuranceClass => insuranceClass.serialize()),
        }
    }
    static deserialize(json){
        const insurer = new Insurer()
        insurer.id = json['id']
        insurer.name = json['name'] || ''
        insurer.address = Address.deserialize(json['address'])
        insurer.insuranceClasses = json['insuranceClasses'] ? json['insuranceClasses'].map(insuranceClass => InsuranceClass.deserialize(insuranceClass)) : []
        return insurer
    }
}

decorate(Insurer, {
    name: observable,
    done: observable,
    insuranceClasses: observable,
    isValid: computed,
})
