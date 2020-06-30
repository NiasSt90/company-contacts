import React from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./InsurerView";
import ErrorBoundary from "./ErrorBoundary";
import Pagination from "@material-ui/lab/Pagination";
import InsurerEditor from "./InsurerEditor";
import AddIcon from "@material-ui/icons/Add";
import {useRoles} from "../../hooks/useRoles";
import Fab from "@material-ui/core/Fab";
import {Insurer} from "../model/Insurer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const InsurerListView = observer(({model}) => {
			const {isManager} = useRoles();
			const [selectedInsurer, setSelectedInsurer] = React.useState(undefined);
			const handleSaveInsurer = (values) => {
				selectedInsurer.name = values["name"];
				selectedInsurer.address.street = values["street"];
				selectedInsurer.address.number = values["number"];
				selectedInsurer.address.zipCode = values["zipCode"];
				selectedInsurer.address.city = values["city"];
				selectedInsurer.hints = values["hints"];
				selectedInsurer.imgDataURL = values["imgDataURL"];
				model.save(selectedInsurer);
				setSelectedInsurer(undefined);
			}
			return <>
				<ErrorBoundary>
					{model.searchResultList.map((insurer, i) =>
							<InsurerView key={i} model={model} insurer={insurer}
											 onEdit={setSelectedInsurer} onSave={() => model.save(insurer)}
											 onDelete={() => model.remove(insurer)}/>
					)}
					{model.currentPage.totalPages > 1 &&
					 <Pagination
							 onChange={(event, page) => model.changeToPage(page)}
							 count={model.currentPage.totalPages} showFirstButton={!model.currentPage.first}
							 showLastButton={!model.currentPage.last}/>
					}
					{selectedInsurer !== undefined &&
					 <InsurerEditor open insurer={selectedInsurer} onSave={handleSaveInsurer}
										 onCancel={() => setSelectedInsurer(undefined)}/>
					}
					{isManager() &&
					 <Grid container justify="flex-end">
						 <Box mr={2}>
							 <Fab size="medium" color="secondary">
								 <AddIcon onClick={() => setSelectedInsurer(new Insurer("NEU"))}/>
							 </Fab>
						 </Box>
					 </Grid>
					}
				</ErrorBoundary>
			</>
		}
);

export default InsurerListView;
