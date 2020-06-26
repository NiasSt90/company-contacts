import {decorate, observable} from "mobx";

export class ContactLink {

	name = 'LinkName'

	url = undefined

	description = 'Beschreibung'

	serialize(){
		return {
			name: this.name,
			url: this.url,
			description: this.description,
		}
	}
	static deserialize(json){
		const link = new ContactLink()
		link.name = json['name'] || ''
		link.url = json['url'] || ''
		link.description = json['description'] || ''
		return link
	}
}

decorate(ContactLink, {
	name: observable,
	url: observable,
	description: observable,
})