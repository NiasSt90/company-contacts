import {decorate, observable} from "mobx";

export class ContactPerson {

	topic = 'Thema'

	name = 'Name'

	phone = ''

	cellPhone = ''

	mail = ''

	fax = ''

	serialize(){
		return {
			topic: this.topic,
			name: this.name,
			phone: this.phone,
			cellPhone: this.cellPhone,
			mail: this.mail,
			fax: this.fax,
		}
	}
	static deserialize(json){
		const person = new ContactPerson()
		person.topic = json['topic'] || ''
		person.name = json['name'] || ''
		person.phone = json['phone'] || ''
		person.cellPhone = json['cellPhone'] || ''
		person.mail = json['mail'] || ''
		person.fax = json['fax'] || ''
		return person
	}

}

decorate(ContactPerson, {
	topic: observable,
	name: observable,
	phone: observable,
	cellPhone: observable,
	mail: observable,
	fax: observable,
})
