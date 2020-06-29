import {decorate, observable} from "mobx";
import {ContactPerson} from "./ContactPerson";
import {ContactLink} from "./ContactLink";

export class InsuranceClass {
	constructor(name) {
		this.className = name
	}

	className = 'Versicherungszweig'

	contactPersons = []

	links = []

	addPerson(person) {
		if (this.contactPersons.indexOf(person) === -1) this.contactPersons.push(person);
		return person;
	}

	removePerson(person) {
		this.contactPersons = this.contactPersons.filter(p => p !== person);
	}

	addLink(link) {
		if (this.links.indexOf(link) === -1) this.links.push(link);
		return link;
	}

	removeLink(link) {
		this.links = this.links.filter(l => l !== link);
	}

	isEmpty() {
		return this.contactPersons.length === 0 && this.links.length === 0;
	}

	serialize(){
		return {
			className: this.className,
			contactPersons: this.contactPersons.map(person => person.serialize()),
			links: this.links.map(link => link.serialize()),
		}
	}
	static deserialize(json){
		const insuranceClass = new InsuranceClass()
		insuranceClass.className = json['className'] || ''
		insuranceClass.contactPersons = json['contactPersons'] ? json['contactPersons'].map(person => ContactPerson.deserialize(person)) : []
		insuranceClass.links = json['links'] ? json['links'].map(link => ContactLink.deserialize(link)) : []
		return insuranceClass
	}

}

decorate(InsuranceClass, {
	className: observable,
	contactPersons: observable,
	links: observable
})
