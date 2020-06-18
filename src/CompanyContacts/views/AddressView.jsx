import React from "react";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class AddressView extends React.Component {

	render() {
		const address = this.props.address
		const editMode = this.props.editMode;
		if (editMode === true) {
			return <Card>
				<CardContent>
					<TextField label="Straße" type="text" value={address.street}
								  onChange={e => address.street = e.target.value}/>
					<TextField label="Hausnummer" type="text" value={address.number}
								  onChange={e => address.number = e.target.value}/>
					<TextField label="PLZ" type="text" value={address.zipCode}
								  onChange={e => address.zipCode = e.target.value}/>
					<TextField label="Ort" type="text" value={address.city} onChange={e => address.city = e.target.value}/>
				</CardContent>
			</Card>
		}
		else {
			return <Card>
				<CardContent>
				<strong>{address.street} {address.number}</strong><br/>
				<strong>{address.zipCode} {address.city}</strong><br/>
				</CardContent>
			</Card>
		}
	}

}

export default observer(AddressView);