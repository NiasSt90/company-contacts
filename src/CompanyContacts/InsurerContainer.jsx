import React, {useEffect} from "react";
import {useStores} from "../hooks/useStores";
import {useParams} from "react-router";
import {observer} from "mobx-react";
import InsurerView from "./views/InsurerView";
import {action} from "mobx";
import RefreshIcon from "@material-ui/icons/Refresh";

const InsurerContainer = observer(({props}) => {
	const {id} = useParams()
	const {toolbarHandler, insurerModel} = useStores();
	const [insurer, setInsurer] = React.useState(null);
	const load = () => {
		if (id) {
			insurerModel.load(id).then(action("LoadInsurer", insurer => setInsurer(insurer)));
		}
		else {
			insurerModel.create().then(action("NewInsurer", insurer => setInsurer(insurer)));
		}
	}
	useEffect(() => {
		toolbarHandler.changeToolbar({title: "Versicherer", showSearch: false, showDefaultActions: true,
			actions: [
				{name: "Reload", label: "Neu laden",icon: <RefreshIcon/>, onClick:load}
			]});
		load();
	}, [id, insurerModel, toolbarHandler]);

	return <>{insurer && <InsurerView insurer={insurer} expanded/>}</>;
});
export default InsurerContainer;