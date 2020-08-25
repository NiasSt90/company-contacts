import {action, decorate, observable} from 'mobx'
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
        this.searchResultList = result.content.map(content => Insurer.deserialize(content.data, content.id));
        this.currentPage = {page: result.number, size: result.size,
            totalElements:result.totalElements, totalPages: result.totalPages,
            first:result.first, last:result.last};
    }
    changeToPage(page) {
        this.search(this.searchText, page);
    }

    //	@action
    search(searchText, page= 0) {
        this.currentPage.page = page;
        if (!searchText || searchText.trim().length === 0) {
            this.showAll(page);
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
    showAll(page=0) {
        this.activityHandler.onStart();
        this.searchText = "";
        this.currentPage.page = page;
        this.contactsApi.index(this.currentPage).then(
              action("fetchSuccess", result => {
                  this.onResults(result);
              }),
              action("fetchError", error => {
                  this.activityHandler.onError(error);
              }));
    }

    //	@action
    add(newInsurer) {
        this.activityHandler.onStart();
        return this.contactsApi.post(newInsurer.serialize()).then(
            action("addSuccess", result => {
                this.activityHandler.onSuccess("neuen Versicherer " + newInsurer.name + " angelegt.");
                newInsurer.id = result;
                return newInsurer;
            }),
            action("addError", error => {
                this.activityHandler.onError(error)
            }));
    }

//	@action
    delete(insurer) {
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
        this.contactsApi.put(insurer.id, insurer.serialize()).then(
            action("saveSuccess", result => {
                this.activityHandler.onSuccess("Versicherer " + insurer.name + " gespeichert")
            }),
            action("saveError", error => {
                this.activityHandler.onError("Fehler beim Speichern: " + error);
            }));
    }

    load(id) {
        this.activityHandler.onStart();
        return this.contactsApi.get(id).then(
              action("loadSuccess", result => {
                  this.activityHandler.onSuccess();
                  return  Insurer.deserialize(result.data, result.id);
              }),
              action("loadError", error => {
                  this.activityHandler.onError("Fehler beim Laden: " + error);
              })
        )
    }

    create() {
        this.activityHandler.onStart();
        return Promise.resolve(new Insurer("Neuer Versicherer"))
              .finally(() => this.activityHandler.onSuccess());
    }
}

decorate(InsurerViewModel, {
    searchResultList: observable,
    currentPage: observable,

    changeToPage: action,
    search: action,
    searchClear: action,
    add: action,
    remove: action,
    load: action,
    showAll: action,
    save: action,
})

export default InsurerViewModel;