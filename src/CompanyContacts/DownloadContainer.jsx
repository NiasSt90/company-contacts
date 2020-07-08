import React, {useEffect} from "react";
import {useStores} from "../hooks/useStores";
import {useParams} from "react-router";
import {observer} from "mobx-react";

const DownloadContainer = observer(({props}) => {
	const {documentModel} =  useStores();
	const { id } = useParams()
	useEffect(() => {documentModel.download(id)}, [id,documentModel])
});
export default DownloadContainer;