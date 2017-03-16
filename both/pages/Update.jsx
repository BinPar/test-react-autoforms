import React from 'react';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import BinPar from '../main';
import {PageHeader, Grid} from 'react-bootstrap';

export default class Update extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			model: null
		};
	}

	componentWillMount() {
		BinPar.DB[this.props.collection].getDocumentById(this.props.id, (err, res) => {
			if(res) {
				this.setState({ model: res, ready: true });
			}
		});
	}

	render() {
		if(!this.state.ready) {
			return null;
		}
		const { collection } = this.props;
		return (
			<Grid>
				<PageHeader>Edit {collection}</PageHeader>
				<AutoForm
					schema={BinPar.DB[collection].getSchema()}
					model={this.state.model}
					onSubmit={doc => {
						BinPar.DB[collection].update({ _id: doc._id }, { $set: doc });
						window.location.reload();
					}}
					onSubmitSuccess={(nMod) => console.log(nMod)}
					onSubmitFailure={(e) => console.log(e)}
				/>
			</Grid>
		)
	}
}