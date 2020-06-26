import {action, computed, decorate, observable, runInAction} from 'mobx'
import {Insurer} from "./model/Insurer";
import useFetch from "../hooks/useFetch";

class InsurerViewModel {

    /*@observable*/
    searchResultList = []

    state = "pending" // "pending" / "done" / "error"
    message = undefined
    messageSeverity = "success"

    currentPage = {page: 0, size: 10, totalElements: 0, totalPages: 0, first: true, last: true}

    constructor(baseUrl) {
        this.api = useFetch(baseUrl);
    }
    get messageState() {
        return this.message !== undefined;
    }
    resetMessageState() {
        this.message = undefined;
    }
    onStart() {
        this.state = "pending";
    }
    onError(errorMsg) {
        this.state = "error";
        this.message = errorMsg;
        this.messageSeverity = "error";
    }
    onSuccess(msg) {
        this.state = "done";
        this.message = msg;
        this.messageSeverity = "success";
    }
    onResults(result) {
        console.log(result);
        this.state = "done";
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
        this.onStart();
        this.searchText = searchText;
        this.api.search(searchText, this.currentPage).then(
            action("fetchSuccess", result => {
                this.onResults(result);
            }),
            action("fetchError", error => {
                this.onError(error)
            }));
    }

    //	@action
    add(name) {
        this.onStart();
        const newInsurer = new Insurer(name)
        this.api.post(newInsurer).then(
            action("addSuccess", result => {
                this.onSuccess("neuen Versicherer erstellt");
                newInsurer.id = result;
                this.searchResultList.push(newInsurer);
            }),
            action("addError", error => {
                this.onError(error)
            }));
    }

//	@action
    remove(insurer) {
        this.onStart();
        this.api.del(insurer.id).then(
            action("delSuccess", result => {
                this.searchResultList = this.searchResultList.filter(i => i.id !== insurer.id);
                this.onSuccess("Versicherer " + insurer.name + " gelöscht!");
            }),
            action("delError", error => {
                this.onError(error)
            }));
    }

//	@action
    save(insurer) {
        this.onStart();
        this.api.put(insurer.id, insurer).then(
            action("saveSuccess", result => {
                this.onSuccess("Versicherer " + insurer.name + " gespeichert")
            }),
            action("saveError", error => {
                this.onError("Fehler beim Speichern: " + error);
            }));
    }

//	@action
    load() {
        this.onStart();
        this.api.index(this.currentPage).then(
            action("fetchSuccess", result => {
                this.onResults(result);
            }),
            action("fetchError", error => {
                this.onError(error);
            }));
    }

    static mapToInsurer(contentEntry) {
        let insurer = Insurer.deserialize(contentEntry.data);
        insurer.id = contentEntry.id;
        return insurer;
    }

}

decorate(InsurerViewModel, {
    insurerList: observable,
    searchResultList: observable,
    state: observable,
    message: observable,
    currentPage: observable,
    messageState: computed,

    changeToPage: action,
    search: action,
    add: action,
    remove: action,
    load: action,
    save: action,
    reset: action,
})

export default InsurerViewModel;