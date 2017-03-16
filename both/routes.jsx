import React from 'react';
import {mount, withOptions} from 'react-mounter';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import List from './pages/List';
import MainLayout from './layout/MainLayout';
import BinPar from './main';

if(Meteor.isClient){
	FlowRouter.wait();
	BinPar.onFWReady(() => {
		FlowRouter.initialize();
	});
}

let lastRoute = null;
const setLastRoutePath = (context, redirect, stop) => {
	let newRoutePath = context.path;
	FlowRouter.lastRoutePath = lastRoute;
	lastRoute = newRoutePath;
};

FlowRouter.triggers.enter([setLastRoutePath]);

FlowRouter.route('/', {
	action(_params) {
		mount(MainLayout, {
			content: props => <Home />
		});
	}
});

FlowRouter.route('/create/:collection', {
	action(_params) {
		mount(MainLayout, {
			content: props => <Create collection={_params.collection} />
		});
	}
});

FlowRouter.route('/edit/:collection/:id', {
	action(_params) {
		mount(MainLayout, {
			content: props => <Update collection={_params.collection} id={_params.id} />
		});
	}
});

FlowRouter.route('/list/:collection', {
	action(_params) {
		mount(MainLayout, {
			content: props => <List collection={_params.collection} />
		});
	}
});