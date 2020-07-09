import {decorate, observable} from "mobx";
import keycloak from "../keycloak";

class AuthTokenStore {
	token

	name

	username

	email

	onToken = (tokens) => {
		this.token = tokens.token;
		if (keycloak.tokenParsed) {
			this.username = keycloak.tokenParsed.preferred_username;
			this.name = keycloak.tokenParsed.name;
			this.email = keycloak.tokenParsed.email;
		}
	}

	onKeycloakEvent = (event, error) => {
		console.log('onKeycloakEvent: ', event, error)
		switch (event) {
			case "onAuthSuccess":
				break;
			case "onReady":
			case "onAuthError":
			case "onAuthRefreshSuccess":
			case "onAuthRefreshError":
			case "onTokenExpired":
			case "onAuthLogout":
				break;
			default:
		}
	}
}

export default decorate(AuthTokenStore, {
	name: observable,
	username: observable,
	email: observable,
	token: observable
});
