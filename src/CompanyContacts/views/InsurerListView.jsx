import React from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./InsurerView";
import ErrorBoundary from "./ErrorBoundary";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";

const InsurerListView = observer(({model}) => {
			return <React.Fragment>
				{model.state === "pending" && <LinearProgress />}
				<ErrorBoundary>
					{model.searchResultList.map((insurer, i) =>
							<InsurerView key={i} model={model} insurer={insurer}/>
					)}
				</ErrorBoundary>
			</React.Fragment>
		}
);

export default InsurerListView;
