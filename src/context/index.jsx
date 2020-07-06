import React from 'react'
import AuthTokenStore from "./AuthTokenStore";
import ThemeStore from "./ThemeStore";
import InsurerViewModel from "../CompanyContacts/InsurerViewModel";
import settings from "../settings";
import DocumentViewModel from "./DocumentViewModel";
import ActivityHandler from "./ActivityHandler";

let authTokenStore = new AuthTokenStore();
let activityHandler = new ActivityHandler();
export const storesContext = React.createContext({
	authStore: authTokenStore,
	themeStore: new ThemeStore(),
	activityHandler: activityHandler,
	documentModel: new DocumentViewModel(settings.REST_API_CONTACTS, authTokenStore, activityHandler),
	insurerModel: new InsurerViewModel(settings.REST_API_CONTACTS, authTokenStore, activityHandler),
})