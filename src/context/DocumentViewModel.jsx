import {action, decorate, observable} from "mobx";
import useFetch from "../hooks/useFetch";

class DocumentViewModel {

	selectedDocument
	error

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
					this.selectedDocument.id = result;
					this.activityHandler.onSuccess();
					return true;
				}))
				.catch(action("uploadError", error => {
					this.activityHandler.onError(error);
				}));
	}

	download(document) {
		this.activityHandler.onStart();
		this.blobsApi.download(document.id + "1")
				.then(success => action("OnSuccess", success => {
					this.activityHandler.onSuccess()
				}))
				.catch(error => action("OnError", error => {
					this.activityHandler.onError(error)
				}));
	}

	delete(document) {
		try {
			this.blobsApi.del(document.id)
					.catch(error => action("OnDeleteError", error => {
						this.error = error;
					}));
		}
		catch (e) {
			console.log(e);
		}
	}
}
export default decorate(DocumentViewModel, {
	selectedDocument: observable,
	error: observable,
	uploadFile: action,
	handleFileSelect: action,
});