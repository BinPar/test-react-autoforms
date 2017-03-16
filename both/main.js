import DB from './db';
import fs from 'fs';
import path from 'path';

class BinParClass {

	constructor()
	{
		this.DB  = new DB();
		this.updateCurrentNodeSubs = [];
		this.ready = Meteor.isServer;
		this._onReadyQueue = [];
		this._onFWReadyQueue = [];
		if(Meteor.isServer) {
			let DbPool = require('../server/dbPool').default;
			this.API = {};
			this.publications = {};
			this.methods = {};
			this.queries = {};
			this.cache = {};
			this.dbPool = new DbPool();
			// this.DB.constants.getConstantsObject();

			if (process.env.NODE_ENV === 'development') {
				this.uploadsFolder = path.join(process.cwd(), "/../../../../../../uploads/");
			}
			else {
				this.uploadsFolder = path.join(process.cwd(), "uploads"); //no check
				try {
					fs.statSync(this.uploadsFolder);
				} catch (err) {
					fs.mkdirSync(this.uploadsFolder);
				}
			}
		} else {
			Meteor.call("setupBinParAPI", (e, API) =>
			{
				if(e) console.error("Error setting up BinParAPI :" + e);

				for(let method of API.methods)
				{
					let parts = method.split('.');
					if(parts.length>1) {
						if(BinPar.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated method in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BinPar.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.call(method, ...params);
							}
						}
					}
				}

				for(let publication of API.publications)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(BinPar.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BinPar.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.subscribe(publication, ...params);
							}
						}
					}
				}

				for(let publication of API.queries)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(BinPar.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BinPar.DB[parts[0]][parts[1]] = function(...params) {
								let subs = Meteor.subscribe(publication, ...params);
								subs.query = BinPar.DB[parts[0]]["query_" + parts[1]].bind(BinPar.DB[parts[0]], Meteor.userId(),...params);
								return subs;
							}
						}
					}
				}
				this.readyFrameWork();

				if(Meteor.userId()) {
					this.setupUserCache();
				}

				Accounts.onLogin(()=>{
					console.log("Logged In...");
					this.setupUserCache()
				});
				Accounts.onLogout(()=>{
					console.log("Logged Out...");
					this._onReadyQueue = [];
					this._onFWReadyQueue = [];
					this.cache = {};
					this.ready = false;
					this._fwReady = false;
					if(this.globalSubscriptions) {
						let subs = this.globalSubscriptions;
						for (let i=0,l=subs.length;i<l;i++) {
							let subscription = subs[i];
							if (subscription.stop) subscription.stop();
						}
						this.globalSubscriptions = null;
					}
				});
			});
		}
	}

	readyFrameWork() {
		let fn;
		while (fn = this._onFWReadyQueue.shift()) {
			fn();
		}

		this._fwReady = true;
	}

	onFWReady(fn) {
		if(this._fwReady) {
			fn();
		} else {
			this._onFWReadyQueue.push(fn);
		}
	}
}

const BinPar = new BinParClass();
export default BinPar;