import {action, decorate, observable} from "mobx";
import useFetch from "../hooks/useFetch";

class DocumentViewModel {

	selectedDocument

	constructor(baseUrl, authTokenStore, activityHandler) {
		this.blobsApi = useFetch(baseUrl + "/blobs", authTokenStore);
		this.activityHandler = activityHandler;
	}

	selectDocument(document) {
		this.selectedDocument = document;
	}

	handleFileSelect = (event) => {
		const file = event.target.files[0];
		if (file) {
			this.selectedDocument.file = file;
			this.selectedDocument.name = file.name;
			this.selectedDocument.contentType = file.type;
		}
		else {
			this.selectedDocument.file = undefined;
			this.selectedDocument.name = "";
			this.selectedDocument.contentType = "";
		}
	}

	handleNameChange = (event) => {
		this.selectedDocument.name = event.target.value;
	}

	uploadFile() {
		this.activityHandler.onStart();
		var formData = new FormData();
		formData.append(`file`, this.selectedDocument.file);
		return this.blobsApi.upload(formData).then(
				action("uploadSuccess", result => {
					this.activityHandler.onSuccess();
					this.selectedDocument.id = result;
					return this.selectedDocument;
				}),
				action("uploadError", error => {
					this.activityHandler.onError(error);
				})
		)
	}

	download(document) {
		this.activityHandler.onStart();
		this.blobsApi.download(document.id).then(
				action("OnSuccess", success => {
					this.activityHandler.onSuccess()
				}),
				action("OnSuccess", error => {
					this.activityHandler.onError(error);
				}));
	}

	delete(document) {
		this.activityHandler.onStart();
		this.blobsApi.del(document.id).then(
				action("OnSuccess", success => {
					this.activityHandler.onSuccess("Dokument erfolgreich gelöscht!")
				}),
				action("OnDeleteError", error => {
					this.activityHandler.onError(error);
				}));
	}
}

export default decorate(DocumentViewModel, {
	selectedDocument: observable,
	error: observable,
	selectDocument: action,
	uploadFile: action,
	handleFileSelect: action,
});