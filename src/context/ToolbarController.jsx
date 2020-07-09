import {decorate, observable} from "mobx";

export class ToolbarController {
	title = "Produktpartner"
	showSearch = false
	showDefaultActions = true
	searchAction
	actions = []

	changeToolbar(params) {
		Object.assign(this, params);
	}
}

decorate(ToolbarController, {
	title: observable,
	searchAction: observable,
})
