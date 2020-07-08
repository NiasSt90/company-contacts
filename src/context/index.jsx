import React from 'react'
import AuthTokenStore from "./AuthTokenStore";
import ThemeStore from "./ThemeStore";
import InsurerViewModel from "../CompanyContacts/InsurerViewModel";
import settings from "../settings";
import DocumentViewModel from "./DocumentViewModel";
import ActivityHandler from "./ActivityHandler";
import {useLocalStore} from "mobx-react-lite";

let authTokenStore = new AuthTokenStore();
let activityHandler = new ActivityHandler();
function createNewStore() {
	return {
		authStore: authTokenStore,
		themeStore: new ThemeStore(),
		activityHandler: activityHandler,
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