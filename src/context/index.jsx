import React from 'react'
import AuthTokenStore from "./AuthTokenStore";
import ThemeStore from "./ThemeStore";
import InsurerViewModel from "../CompanyContacts/InsurerViewModel";
import settings from "../settings";
import DocumentViewModel from "./DocumentViewModel";
import ActivityHandler from "./ActivityHandler";
import {useLocalStore} from "mobx-react-lite";
import {ToolbarController} from "./ToolbarController";

let authTokenStore = new AuthTokenStore();
let activityHandler = new ActivityHandler();
function createNewStore() {
	return {
		//global
		authStore: authTokenStore,
		activityHandler: activityHandler,
		toolbarHandler: new ToolbarController(),
		themeStore: new ThemeStore(),
		//local, could be extracted and move into provider-based store/context
		documentModel: new DocumentViewModel(settings.REST_API_CONTACTS, authTokenStore, activityHandler),
		insurerModel: new InsurerViewModel(settings.REST_API_CONTACTS, authTokenStore, activityHandler),
	}
}

//global and default store
export const storesContext = React.createContext(createNewStore())

//provider for local stores
export const StoresProvider = ({ children }) => {
	const store = useLocalStore(createNewStore);
	return <storesContext.Provider value={store}>{children}</storesContext.Provider>
}