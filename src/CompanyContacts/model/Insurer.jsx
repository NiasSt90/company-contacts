import {observable, computed, decorate} from 'mobx'
import {Address} from "./Address";

export class Insurer {

    //unique ID for this entry
    id

    //name of the insurer
    /*@observable*/ name = ''

    address = new Address();

    image

    /*@observable*/ done = false

    // computed values are values derived and automatically updated when the observed
    // observable values changes. For example we use it to determine whenever the insurer is valid
    /*@computed*/ get isValid() {
        // a text is required
        return this.name !== ''
    }


    // this two methods will serialize and deserialize the insurer
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    serialize(){
        return {
            id: this.id,
            name: this.name,
            done: this.done,
            address: this.address.serialize()
        }
    }
    static deserialize(json){
        const insurer = new Insurer()
        insurer.id = json['id']
        insurer.name = json['name'] || ''
        insurer.done = json['done'] || false
        insurer.address = Address.deserialize(json['address'])
        return insurer
    }
}

decorate(Insurer, {
    name: observable,
    done: observable,
    isValid: computed,
})
