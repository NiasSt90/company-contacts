import {action, computed, decorate, observable} from 'mobx'
import {Insurer} from "./model/Insurer";
import useFetch from "../hooks/useFetch";

class InsurerViewModel {

    searchResultList = []

    currentPage = {page: 0, size: 10, totalElements: 0, totalPages: 0, first: true, last: true}

    constructor(baseUrl, authTokenStore, activityHandler) {
        this.contactsApi = useFetch(baseUrl + "/contact", authTokenStore);
        this.activityHandler = activityHandler;
    }
    onResults(result) {
        console.log(result);
        this.activityHandler.onSuccess();
        this.searchResultList = result.content.map(content => InsurerViewModel.mapToInsurer(content));
        this.currentPage = {page: result.number, size: result.size,
            totalElements:result.totalElements, totalPages: result.totalPages,
            first:result.first, last:result.last};
    }
    changeToPage(page) {
        this.currentPage.page = page - 1;
        this.search(this.searchText);
    }

    //	@action
    search(searchText) {
        if (!searchText || searchText.trim().length === 0) {
            this.load();
            return;
        }
        this.activityHandler.onStart();
        this.searchText = searchText;
        this.contactsApi.search(searchText, this.currentPage).then(
            action("fetchSuccess", result => {
                result.totalElements > 0 ? this.onResults(result) : this.activityHandler.onSuccess("Kein Treffer mit <" + searchText + ">", "info")
            }),
            action("fetchError", error => {
                this.activityHandler.onError(error)
            }));
    }

    //	@action
    add(newInsurer) {
        this.activityHandler.onStart();
        this.contactsApi.post(newInsurer).then(
            action("addSuccess", result => {
                this.activityHandler.onSuccess("neuen Versicherer " + newInsurer.name + " angelegt.");
                newInsurer.id = result;
                this.searchResultList.push(newInsurer);
            }),
            action("addError", error => {
                this.activityHandler.onError(error)
            }));
    }

//	@action
    remove(insurer) {
        this.activityHandler.onStart();
        this.contactsApi.del(insurer.id).then(
            action("delSuccess", result => {
                this.searchResultList = this.searchResultList.filter(i => i.id !== insurer.id);
                this.activityHandler.onSuccess("Versicherer " + insurer.name + " gelöscht!");
            }),
            action("delError", error => {
                this.activityHandler.onError(error)
            }));
    }

//	@action
    save(insurer) {
        if (insurer.id === undefined) {
            this.add(insurer);
            return;
        }
        this.activityHandler.onStart();
        this.contactsApi.put(insurer.id, insurer).then(
            action("saveSuccess", result => {
                this.activityHandler.onSuccess("Versicherer " + insurer.name + " gespeichert")
            }),
            action("saveError", error => {
                this.activityHandler.onError("Fehler beim Speichern: " + error);
            }));
    }

//	@action
    load() {
        this.activityHandler.onStart();
        this.contactsApi.index(this.currentPage).then(
            action("fetchSuccess", result => {
                this.onResults(result);
            }),
            action("fetchError", error => {
                this.activityHandler.onError(error);
            }));
    }

    static mapToInsurer(contentEntry) {
        let insurer = Insurer.deserialize(contentEntry.data);
        insurer.id = contentEntry.id;
        return insurer;
    }

}

decorate(InsurerViewModel, {
    searchResultList: observable,
    currentPage: observable,

    changeToPage: action,
    search: action,
    add: action,
    remove: action,
    load: action,
    save: action,
})

export default InsurerViewModel;