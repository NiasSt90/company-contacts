import React, {useEffect} from "react";
import {useStores} from "../hooks/useStores";
import {useParams} from "react-router";
import {observer} from "mobx-react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const DownloadContainer = observer(({props}) => {
	const {toolbarHandler, documentModel} =  useStores();
	const { id } = useParams()
	useEffect(() => {
		toolbarHandler.changeToolbar({title: "Downloads", showSearch: false, showDefaultActions: false, actions: []});
		documentModel.download(id)
	}, [id,documentModel,toolbarHandler])

	return <>
		<Container maxWidth="xs"><Typography variant="h5">Der Download startet automatisch...</Typography></Container>
		</>
});
export default DownloadContainer;