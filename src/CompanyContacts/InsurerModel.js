import {observable, computed} from 'mobx'

export class InsurerModel {

    //unique ID for this entry
    id

    //name of the insurer
    @observable name = ''


    // is the todo done?
    @observable done = false

    // computed values are values derived and automatically updated when the observed
    // observable values changes. For example we use it to determine whenever the todo is valid
    @computed get isValid() {
        // a text is required
        return this.name !== ''
    }


    // this two methods will serialize and deserialize the todo
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    serialize(){
        return {
            id: this.id,
            name: this.name,
            done: this.done
        }
    }
    static deserialize(json: Object){
        const insurer = new InsurerModel()
        insurer.id = json['id']
        insurer.name = json['name'] || ''
        insurer.done = json['done'] || false
        return insurer
    }

}