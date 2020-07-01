import React from 'react'
import AuthTokenStore from "./AuthTokenStore";
import ThemeStore from "./ThemeStore";
import InsurerViewModel from "../CompanyContacts/InsurerViewModel";
import settings from "../settings";

let authTokenStore = new AuthTokenStore();
export const storesContext = React.createContext({
	authStore: authTokenStore,
	themeStore: new ThemeStore(),
	viewmodel: new InsurerViewModel(settings.REST_API_CONTACTS, authTokenStore),
})