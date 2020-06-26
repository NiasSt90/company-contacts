import {decorate, observable} from "mobx";

export class ContactLink {

	name = 'LinkName'

	url = undefined

	description = 'Beschreibung'
}

decorate(ContactLink, {
	name: observable,
	url: observable,
	description: observable,
})