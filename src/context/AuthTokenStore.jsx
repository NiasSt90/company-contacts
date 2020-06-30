import {decorate, observable} from "mobx";

class AuthTokenStore {
	token
}

decorate(AuthTokenStore, {
	token: observable,
})

export default AuthTokenStore;
