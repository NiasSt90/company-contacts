import React, {useEffect} from "react";
import {useStores} from "../hooks/useStores";
import {useParams} from "react-router";
import {observer} from "mobx-react";
import InsurerView from "./views/InsurerView";
import {action} from "mobx";

const InsurerContainer = observer(({props}) => {
	const {insurerModel} = useStores();
	const {id} = useParams()
	const [insurer, setInsurer] = React.useState(null);
	useEffect(() => {
		if (id) {
			insurerModel.load(id).then(action("LoadInsurer", insurer => setInsurer(insurer)));
		}
		else {
			insurerModel.create().then(action("NewInsurer", insurer => setInsurer(insurer)));
		}
	}, [id, insurerModel]);

	return <>{insurer && <InsurerView insurer={insurer} expanded/>}</>;
});
export default InsurerContainer;