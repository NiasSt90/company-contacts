import {action, computed, decorate, observable} from "mobx";

class ActivityHandler {

	state = "pending" // "pending" / "done" / "error"
	message = undefined
	messageSeverity = "success"

	get messageState() {
		return this.message !== undefined;
	}
	resetMessageState() {
		this.message = undefined;
	}
	onStart() {
		this.state = "pending";
	}
	onError(errorMsg) {
		this.state = "error";
		this.message = errorMsg;
		this.messageSeverity = "error";
	}
	onSuccess(msg, severity= "success") {
		this.state = "done";
		this.message = msg;
		this.messageSeverity = severity;
	}
}

export default decorate(ActivityHandler, {
	message: observable,
	state: observable,
	resetMessageState: action,
	messageState: computed,
});
