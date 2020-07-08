import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./InsurerView";
import ErrorBoundary from "./ErrorBoundary";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
import {useRoles} from "../../hooks/useRoles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router";

const InsurerListView = observer(({model}) => {
			const {isManager} = useRoles();
			useEffect(() => {model.showAll();}, [model]);
			const history = useHistory();
			return <>
				<ErrorBoundary>
					{model.searchResultList.map((insurer, i) =>
							<InsurerView key={i} insurer={insurer}/>
					)}
					{model.currentPage.totalPages > 1 &&
					 <Pagination
							 onChange={(event, page) => model.changeToPage(page)}
							 count={model.currentPage.totalPages} showFirstButton={!model.currentPage.first}
							 showLastButton={!model.currentPage.last}/>
					}
					{isManager() &&
					 <Grid container justify="flex-end">
						 <Box mr={2}>
							 <Fab size="medium" color="secondary">
								 <AddIcon onClick={() => history.push("/insurer")}/>
							 </Fab>
						 </Box>
					 </Grid>
					}
				</ErrorBoundary>
			</>
		}
);

export default InsurerListView;
