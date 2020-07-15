import {computed, decorate, observable} from 'mobx'
import {Address} from "./Address";
import {InsuranceClass} from "./InsuranceClass";
import {FileDocument} from "./FileDocument";
import settings from "../../settings";

export class Insurer {

    id

    name = ''

    hints = ''

    //deprecated
    imgDataURL

    imgBlobID

    address = new Address();

    visibility = []

    insuranceClasses = []

    documents = []

    constructor(name) {
        this.name = name;
    }

    addInsuranceClass(name) {
        if (this.insuranceClasses.filter(insuranceClass => insuranceClass.className === name).length === 0) {
            this.insuranceClasses.push(new InsuranceClass(name))
        }
    }

    delInsuranceClass(clazz) {
        this.insuranceClasses = this.insuranceClasses.filter(x => x !== clazz);
    }

    addDocument(document) {
        this.documents.push(document);
    }

    delDocument(document) {
        this.documents = this.documents.filter(x => x !== document);
    }

    get imageUrl() {
        return this.imgBlobID !== undefined ? settings.REST_API_CONTACTS + "/blobs/" + this.imgBlobID + "?inline=true" : this.imgDataURL;
    }

    // this two methods will serialize and deserialize the insurer
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    serialize(){
        return {
            id: this.id,
            name: this.name,
            hints: this.hints,
            imgDataURL: this.imgDataURL,
            imgBlobID: this.imgBlobID,
            address: this.address.serialize(),
            insuranceClasses: this.insuranceClasses.map(insuranceClass => insuranceClass.serialize()),
            documents: this.documents.map(doc => doc.serialize()),
            ...(this.visibility.length > 0 ? { visibility: this.visibility } : {}),
        }
    }
    static deserialize(json, id){
        const insurer = new Insurer()
        insurer.id = id
        insurer.name = json['name'] || ''
        insurer.hints = json['hints'] || ''
        insurer.visibility = json['visibility'] || []
        insurer.imgBlobID = json['imgBlobID'] || ''
        insurer.imgDataURL = json['imgDataURL'] || ''
        insurer.address = Address.deserialize(json['address'])
        insurer.insuranceClasses = json['insuranceClasses'] ? json['insuranceClasses'].map(insuranceClass => InsuranceClass.deserialize(insuranceClass)) : []
        insurer.documents = json['documents'] ? json['documents'].map(doc => FileDocument.deserialize(doc)) : []
        return insurer
    }
}

decorate(Insurer, {
    name: observable,
    hints: observable,
    visibility: observable,
    insuranceClasses: observable,
    documents: observable,
    imgBlobID: observable,
    imageUrl: computed
})
