import {action, computed, decorate, observable, runInAction} from 'mobx'
import {Insurer} from "./model/Insurer";
import useFetch from "../hooks/useFetch";

class InsurerViewModel {

    /*@observable*/
    searchResultList = []

    state = "pending" // "pending" / "done" / "error"
    message = undefined
    messageSeverity = "success"

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

    constructor(baseUrl) {
        this.api = useFetch(baseUrl);
    }

    //	@action
    search(searchText) {
        if (!searchText || searchText.trim().length === 0) {
            this.load();
            return;
        }
        this.onStart();
        this.api.search(searchText).then(
            action("fetchSuccess", result => {
                console.log(result);
                this.searchResultList = result.content.map(content => InsurerViewModel.mapToInsurer(content));
                this.onSuccess()
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
        this.api.get().then(
            action("fetchSuccess", result => {
                this.searchResultList = result.content.map(content => InsurerViewModel.mapToInsurer(content));
                this.onSuccess()
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
    messageState: computed,
    search: action,
    add: action,
    remove: action,
    load: action,
    save: action,
    reset: action,
})

export default InsurerViewModel;