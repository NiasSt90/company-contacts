import React from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./InsurerView";
import ErrorBoundary from "./ErrorBoundary";
import LinearProgress from "@material-ui/core/LinearProgress";
import Pagination from "@material-ui/lab/Pagination";

const InsurerListView = observer(({model}) => {
			return <React.Fragment>
				<ErrorBoundary>
					{model.searchResultList.map((insurer, i) =>
							<InsurerView key={i} model={model} insurer={insurer}/>
					)}
					{model.currentPage.totalPages > 1 &&
					 	<Pagination
							onChange={(event, page) => model.changeToPage(page)}
							count={model.currentPage.totalPages} showFirstButton={!model.currentPage.first} showLastButton={!model.currentPage.last} />
					}
				</ErrorBoundary>
			</React.Fragment>
		}
);

export default InsurerListView;
