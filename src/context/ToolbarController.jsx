import {decorate, observable} from "mobx";

export class ToolbarController {
	title = "Produktpartner"
	showSearch = false
	showDefaultActions = true
	searchAction
	searchValue
	searchClearAction
	actions = []

	changeToolbar(params) {
		Object.assign(this, params);
	}

	clearSearch = () => {
		this.searchClearAction();
		this.searchValue = "";
	}
}

decorate(ToolbarController, {
	title: observable,
	searchAction: observable,
	searchValue: observable,
	searchClearAction: observable,
})
