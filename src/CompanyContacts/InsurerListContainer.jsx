import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./views/InsurerView";
import ErrorBoundary from "./views/ErrorBoundary.jsx";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router";
import {useRoles} from "../hooks/useRoles";
import {useStores} from "../hooks/useStores";

const InsurerListContainer = observer(({props}) => {
			const {isManager} = useRoles();
			const {toolbarHandler, insurerModel} = useStores();
			const history = useHistory();
			useEffect(() => {
				toolbarHandler.changeToolbar({title: "Produktpartner - App", showSearch: true, showDefaultActions: true,
					searchAction: (event) => insurerModel.search(event.target.value),
					searchClearAction: (event) => insurerModel.showAll(),
					actions: [
						{name: "Reload", label: "Neu laden",icon: <RefreshIcon color={'secondary'}/>, onClick:() => insurerModel.showAll()}
					]});
				insurerModel.showAll();
			}, [insurerModel, toolbarHandler]);
			return <>
				<ErrorBoundary>
					{insurerModel.searchResultList.map((insurer, i) =>
							<InsurerView key={i} insurer={insurer}/>
					)}
					{insurerModel.currentPage.totalPages > 1 &&
					 <Pagination
							 onChange={(event, page) => insurerModel.changeToPage(page - 1)}
							 page={insurerModel.currentPage.page + 1} count={insurerModel.currentPage.totalPages}
							 showFirstButton={!insurerModel.currentPage.first} showLastButton={!insurerModel.currentPage.last}/>
					}
					{isManager() &&
					 <Grid container justify="flex-end">
						 <Box mr={2}>
							 <Fab size="medium" >
								 <AddIcon onClick={() => history.push("/insurer")}/>
							 </Fab>
						 </Box>
					 </Grid>
					}
				</ErrorBoundary>
			</>
		}
);

export default InsurerListContainer;
