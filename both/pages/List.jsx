import React from 'react';
import BinPar from '../main';
import {PageHeader, Grid, Table} from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class List extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				collection: BinPar.DB[props.collection].list(undefined, undefined, undefined, undefined, () => {
					this.setState({ ready: true });
				})
			},
			ready: false,
			schema: BinPar.DB[props.collection].getSchema(),
			filter: undefined,
			sort: undefined,
			limit: props.limit || undefined,
			skip: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.collection !== this.props.collection) {
			this.setState({ limit: nextProps.limit || undefined, skip: 0, filter: undefined, sort: undefined });
			this._refreshSubscription(true, nextProps.collection);
		}
	}

	_refreshSubscription(shouldRefresh, collection) {
		collection = collection || this.props.collection;
		if(shouldRefresh) {
			this.setState({ ready: false });
		}
		const newSub = BinPar.DB[collection].list(this.state.filter, this.state.sort, this.state.limit, this.state.skip, () => {
			this.setState({ ready: true });
		});
		this._cleanSubscription();
		this.setState({ subscription: { collection: newSub } });
	}

	_cleanSubscription() {
		this.state.subscription.collection && this.state.subscription.collection.stop();
	}

	_getDocuments() {
		if(this.state.subscription.collection && this.state.subscription.collection.query) {
			return this.state.subscription.collection.query().fetch();
		} else {
			return [];
		}
	}

	_renderHeader(documents) {
		let res = Object.keys(this.state.schema._schema).map((property, i) => {
			const val = this.state.schema._schema[property];
			return (
				<th key={`th_${property}_${i}`}>
					{val.label || property}
				</th>
			);
		});
		res.unshift(
			<th key="bp_n">#</th>
		);

		return (
			<tr>
				{res}
			</tr>
		);
	}

	_renderBody(documents) {
		return documents.map((doc, i) => {
			return (
				<tr key={`tr_${doc._id}`}>
					{
						Object.keys(doc).map((prop, j) => {
							const val = doc[prop];
							return (
								<td key={`td_${prop}_${j}`}>
									{val.toString()}
								</td>
							);
						})
					}
				</tr>
			);
		});
	}

	_renderFooter(documents) {

	}

	render() {
		if(!this.state.ready) {
			return null;
		}
		const { collection } = this.props;
		const documents = this._getDocuments();
		console.log(documents);
		return (
			<Grid>
				<PageHeader>{collection}</PageHeader>
				<Table responsive>
					<thead>
					{ this._renderHeader(documents) }
					</thead>
					<tbody>
					{ this._renderBody(documents) }
					</tbody>
					<tfoot>
					{ this._renderFooter(documents) }
					</tfoot>
				</Table>
			</Grid>
		)
	}
}