import {decorate, observable} from 'mobx'

export class Address {

	street = ''

	number = ''

	zipCode = ''

	city = ''


	serialize() {
		return {
			street: this.street,
			number: this.number,
			zipCode: this.zipCode,
			city: this.city
		}
	}

	static deserialize(json) {
		const address = new Address()
		if (json) {
			address.street = json['street'] || ''
			address.number = json['number'] || ''
			address.zipCode = json['zipCode'] || ''
			address.city = json['city'] || ''
		}
		return address
	}
}

decorate(Address, {
	street: observable,
	number: observable,
	zipCode: observable,
	city: observable,
})
