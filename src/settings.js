import {set} from "mobx";

const settings = {
	REST_API_CONTACTS: window.env.REST_API_CONTACTS,
	KEYCLOAK_URL: window.env.KEYCLOAK_URL,
	KEYCLOAK_REALM: window.env.KEYCLOAK_REALM,
	KEYCLOAK_CLIENTID: window.env.KEYCLOAK_CLIENTID,
};
//TODO: replace ugly optional override of variables in development mode
if (process.env.NODE_ENV === "development") {
	settings.REST_API_CONTACTS = process.env.REACT_APP_REST_API_CONTACTS ? process.env.REACT_APP_REST_API_CONTACTS : window.env.REST_API_CONTACTS;
	settings.KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL ? process.env.REACT_APP_KEYCLOAK_AUTH_SERVER_URL : window.env.KEYCLOAK_URL;
	settings.KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM ? process.env.REACT_APP_KEYCLOAK_REALM : window.env.KEYCLOAK_REALM;
	settings.KEYCLOAK_CLIENTID = process.env.REACT_APP_KEYCLOAK_CLIENT_ID ? process.env.REACT_APP_KEYCLOAK_CLIENT_ID : window.env.KEYCLOAK_CLIENTID;
}

export default settings;