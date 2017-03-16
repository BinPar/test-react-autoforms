import React from 'react';

export default class MainLayout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			showCounter: true
		};
	}

	componentDidMount() {
		DocHead.addMeta({name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"});
	}

	render() {
		return (
			<div className="wrapper">
				{this.props.content()}
			</div>
		);
	}
}