import {decorate, observable} from "mobx";

class AuthTokenStore {
	token

	name

	username

	email

	keycloak

	init = () => {
		this.username = this.keycloak.tokenParsed.preferred_username;
		this.name = this.keycloak.tokenParsed.name;
		this.email = this.keycloak.tokenParsed.email;
	}
}

export default decorate(AuthTokenStore, {
	name: observable,
	username: observable,
	email: observable
});
