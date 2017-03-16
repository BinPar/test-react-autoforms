import React from 'react';
import BinPar from '../main';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import {PageHeader, Grid} from 'react-bootstrap';

export default class Create extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { collection } = this.props;
		return (
			<Grid>
				<PageHeader>Create a {collection}</PageHeader>
				<AutoForm
					schema={BinPar.DB[collection].getSchema()}
					onSubmit={doc => BinPar.DB[collection].insert(doc)}
					onSubmitSuccess={(docId) => FlowRouter.go(`/edit/${collection}/${docId}`)}
					onSubmitFailure={(e) => console.log(e)}
				/>
			</Grid>
		)
	}
}