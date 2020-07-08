import {action, computed, decorate, observable} from "mobx";

class ActivityHandler {

	state = "done" // "pending" / "done" / "error"
	message = undefined
	messageSeverity = "success"

	get messageState() {
		console.log("MessageState == ", this.message !== undefined, this.message)
		return this.message !== undefined;
	}
	resetMessageState = () => {
		console.log("reset MessageState", this.message)
		this.message = undefined;
	}
	onStart() {
		this.state = "pending";
	}
	onError(errorMsg) {
		this.state = "error";
		this.message = errorMsg instanceof Error ? errorMsg.message : errorMsg;
		this.messageSeverity = "error";
	}
	onSuccess(msg, severity= "success") {
		this.state = "done";
		this.message = msg;
		this.messageSeverity = severity;
	}
}

export default decorate(ActivityHandler, {
	state: observable,
	message: observable,
	messageSeverity: observable,
	resetMessageState: action,
	messageState: computed,
});
