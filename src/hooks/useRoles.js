import {useKeycloak} from "@react-keycloak/web";

export const useRoles = () => {
	const { keycloak } = useKeycloak();
	const isManager = () => {
		return keycloak.hasResourceRole("Manager", "BVO_Contacts");
	}
	const login = () => {
		keycloak.login();
	}
	const logout = () => {
		keycloak.logout();
	}
	const authenticated = () => {
		return keycloak.authenticated;
	}

	return {
		isManager,
		authenticated,
		login,
		logout
	};
}