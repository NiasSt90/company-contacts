import Keycloak from "keycloak-js";
import settings from "./settings";

export default Keycloak({
	"realm": settings.KEYCLOAK_REALM,
	"url": settings.KEYCLOAK_URL,
	"clientId": settings.KEYCLOAK_CLIENTID,
});

