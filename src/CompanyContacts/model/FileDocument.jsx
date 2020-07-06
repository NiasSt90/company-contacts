import {decorate, observable} from "mobx";
import settings from "../../settings";

export class FileDocument {
	id
	name
	contentType
	file

	link() {
		return settings.REST_API_CONTACTS + "/blobs/" + this.id;
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