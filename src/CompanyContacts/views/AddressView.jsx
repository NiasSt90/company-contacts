/*@observer*/ import React from "react";
import {observer} from "mobx-react";

class AddressView extends React.Component {

	render() {
		const model = this.props.model
		const address = this.props.address
		const editMode = this.props.editMode;
		if (editMode === true) {
			return <p>
				Straße:<input type="text" value={address.street} onChange={e => address.street = e.target.value}/><br/>
				Hausnummer:<input type="text" value={address.number} onChange={e => address.number = e.target.value}/><br/>
				PLZ:<input type="text" value={address.zipCode} onChange={e => address.zipCode = e.target.value}/><br/>
				Ort:<input type="text" value={address.city} onChange={e => address.city = e.target.value}/><br/>
			</p>
		}
		else {
			return <p>
				<strong>{address.street} {address.number}</strong><br/>
				<strong>{address.zipCode} {address.city}</strong><br/>
			</p>
		}
	}

}

export default observer(AddressView);