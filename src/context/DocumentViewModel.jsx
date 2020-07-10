import {action, decorate, observable} from "mobx";
import useFetch from "../hooks/useFetch";

class DocumentViewModel {

	selectedDocument

	constructor(baseUrl, authTokenStore, activityHandler) {
		this.blobsApi = useFetch(baseUrl + "/blobs", authTokenStore);
		this.activityHandler = activityHandler;
	}

	uploadFile(document) {
		this.activityHandler.onStart();
		var formData = new FormData();
		formData.append(`file`, document.file);
		return this.blobsApi.upload(formData).then(
				action("uploadSuccess", result => {
					this.activityHandler.onSuccess();
					document.id = result;
					return document;
				}),
				action("uploadError", error => {
					this.activityHandler.onError(error);
				})
		)
	}

	download(id) {
		this.activityHandler.onStart();
		this.blobsApi.download(id).then(
				action("OnSuccess", success => {
					this.activityHandler.onSuccess()
				}),
				action("OnSuccess", error => {
					this.activityHandler.onError(error);
				}));
	}

	delete(id) {
		this.activityHandler.onStart();
		this.blobsApi.del(id).then(
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