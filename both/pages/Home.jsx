import React from 'react';
import BinPar from '../main';
import {ListGroup, ListGroupItem, PageHeader, Grid, Button} from 'react-bootstrap';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid>
				<PageHeader>Collection list</PageHeader>
				<ListGroup>
					{Object.keys(BinPar.DB).map((collectionName, i) => {
						return (
							<ListGroupItem key={`item_${i}`}>
								{collectionName} - <Button bsStyle="success" href={`/create/${collectionName}`}>Create</Button> <Button bsStyle="primary" href={`/list/${collectionName}`}>List</Button>
							</ListGroupItem>
						);
					})}
				</ListGroup>
			</Grid>
		);
	}
}