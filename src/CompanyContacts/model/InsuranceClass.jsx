import {decorate, observable} from "mobx";
import {ContactPerson} from "./ContactPerson";

export class InsuranceClass {
	constructor(name) {
		this.className = name
	}

	className = 'Versicherungszweig'

	contactPersons = []

	addPerson() {
		this.contactPersons.push(new ContactPerson())
	}

	removePerson(person) {
		this.contactPersons = this.contactPersons.filter(p => p !== person);
	}

	serialize(){
		return {
			className: this.className,
			contactPersons: this.contactPersons.map(person => person.serialize()),
		}
	}
	static deserialize(json){
		const insuranceClass = new InsuranceClass()
		insuranceClass.className = json['className'] || ''
		insuranceClass.contactPersons = json['contactPersons'] ? json['contactPersons'].map(person => ContactPerson.deserialize(person)) : []
		return insuranceClass
	}

}

decorate(InsuranceClass, {
	className: observable,
	contactPersons: observable,
})
