import React from 'react'
import AuthTokenStore from "./AuthTokenStore";
import ThemeStore from "./ThemeStore";
import InsurerViewModel from "../CompanyContacts/InsurerViewModel";
import settings from "../settings";

export const storesContext = React.createContext({
	authStore: new AuthTokenStore(),
	themeStore: new ThemeStore(),
	viewmodel: new InsurerViewModel(settings.REST_API_CONTACTS),
})