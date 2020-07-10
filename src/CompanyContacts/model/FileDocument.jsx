import {decorate, observable} from "mobx";

export class FileDocument {
	id
	name
	contentType
	file


	constructor(file, name, type) {
		this.file = file;
		this.name = name;
		this.contentType = type;
	}

	serialize() {
		return {
			id: this.id,
			name: this.name,
			contentType: this.contentType,
		}
	}

	static deserialize(json) {
		const doc = new FileDocument()
		if (json) {
			doc.id = json['id'] || ''
			doc.name = json['name'] || ''
			doc.contentType = json['contentType'] || ''
		}
		return doc
	}
}

decorate(FileDocument, {
	name: observable,
	file: observable,
})