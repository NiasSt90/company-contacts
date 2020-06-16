import {observable, action} from 'mobx'
import {InsurerModel} from './InsurerModel'

export class InsurerViewModel {

	// this is an observable array of the insurer of our insurer editor
	// it is marked as observable because also adding and removing elements
	// from the insurer list should be tracked by the view and/or computed values.
	@observable insurerList = []

	// when the viewmodel is constructed, attempt to load the todos.
	constructor(){
		this.load()
	}

	@action
	add(){
		// simple vanilla js, adding a new Todo instance to the todos.
		const newInsurer = new InsurerModel()
		this.insurerList.push(newInsurer)
		return newInsurer
	}

	@action
	remove(insurer: InsurerModel){
		const index = this.insurerList.indexOf(insurer)
		if(index > -1){
			this.insurerList.splice(index, 1)
		}
	}

	@action
	load(){
		// if the browser has support for localStorage, try to retrieve the saved insurer
		if(window.localStorage){
			const json = JSON.parse(window.localStorage.getItem("insurerList") || "[]")

			// Notice: the insurer => Insurer.deserialize(insurer) is an ES2015 arrow function
			this.insurerList = json.map(insurer => InsurerModel.deserialize(insurer))
		}
	}

	@action
	save(){
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
	}

}