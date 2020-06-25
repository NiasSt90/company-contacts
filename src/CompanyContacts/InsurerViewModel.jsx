import {observable, action, decorate} from 'mobx'
import {Insurer} from "./model/Insurer";

class InsurerViewModel {

	// this is an observable array of the insurer of our insurer editor
	// it is marked as observable because also adding and removing elements
	// from the insurer list should be tracked by the view and/or computed values.
	/*@observable*/ insurerList = []

	/*@observable*/ searchResultList = []

	state = "pending" // "pending" / "done" / "error"

	// when the viewmodel is constructed, attempt to load the insurer.
	constructor(){
		this.load()
	}

	search(searchText) {
		this.state = "pending";
		this.searchResultList = this.insurerList.filter(f => f.name.includes(searchText));
		this.state = "done";
	}

//	@action
	add(){
		const newInsurer = new Insurer()
		this.insurerList.push(newInsurer)
		return newInsurer
	}

//	@action
	remove(insurer){
		const index = this.insurerList.indexOf(insurer)
		if(index > -1){
			this.insurerList.splice(index, 1)
		}
	}

//	@action
	save(insurer){
		this.state = "pending";
		//HACK erstmal alle Speichern, bis REST-Backend single-save erlaubt
		if (this.saveAll()) {
			this.state = "done";
		}
	}

//	@action
	load(){
		this.state = "pending";
		// if the browser has support for localStorage, try to retrieve the saved insurer
		if(window.localStorage){
			const json = JSON.parse(window.localStorage.getItem("insurerList") || "[]")

			// Notice: the insurer => Insurer.deserialize(insurer) is an ES2015 arrow function
			this.insurerList = json.map(insurer => Insurer.deserialize(insurer))
			this.searchResultList = this.insurerList;
		}
		this.state = "done";
	}

//	@action
	saveAll(){
		// are there invalid insurer?
		if(this.insurerList.filter(insurer => insurer.isValid === false).length > 0){
			alert("Unable to save: There are invalid Insurer.")
		}

		if(window.localStorage){
			window.localStorage.setItem(
					"insurerList",
					JSON.stringify(
							this.insurerList.map(insurer => insurer.serialize())
					)
			)
		}
		return true;
	}
}

decorate(InsurerViewModel, {
	insurerList: observable,
	searchResultList: observable,
	state: observable,
	add: action,
	remove: action,
	load: action,
	save: action,
})

export default InsurerViewModel;