import BinPar from '../../main';

export default class ServerCollectionAPI {
	constructor(collectionName) {
		this.collectionName = collectionName;
		BinPar.API[collectionName] = this;
		this.collection = BinPar.DB[collectionName];

		if(!this.collection) throw (`Server Collection API is not targeting an existing collection name "${collectionName}": ${this.constructor.name}`);

		let permissions = this.permissions;

		if(permissions) {
			this.collection.allow(permissions);
		} else if(Meteor.settings.showTablePermissionWarnings){
			console.warn(`It is strongly recommended to setup the permissions for "${collectionName}": ${this.constructor.name}`)
		}

		ServerCollectionAPI.setupAPI(this);
	}

	static setupAPI(target) {
		if (!Meteor.isProduction || target.collectionName=="users") {
			Meteor.startup(()=> {
				if (target.createFixtures) {
					if (target.fixturesRequired()) {
						console.log(`Generating fixtures for "${target.collectionName}"...`);
						target.createFixtures();
					}
				} else if (Meteor.settings.showTableFixturesWarnings) {
					if (target.fixturesRequired()) {
						console.warn(`It is strongly recommended to generate a createFixtures for "${target.collectionName}": ${target.constructor.name}`)
					}
				}
			});
		}

		for (let fn in target) {
			if (fn.indexOf("pub_") == 0 && typeof(target[fn]) == "function") {
				// Si el objeto tiene una función que empieza por get_ en minúsculas, es una publicación de Meteor

				let fnName = fn.substring(4);

				if (BinPar.publications[target.collectionName + "." + fnName]) console.error(`There is another publication called ${target.collectionName + "." + fnName}`);
				BinPar.publications[target.collectionName + "." + fnName] = target[fn];

				Meteor.publish(target.collectionName + "." + fnName, function (...params) {
					return target[fn].call(target, this.userId, ...params);
				});

				if (Meteor.isDevelopment && Meteor.settings.showAPIDetails) {
					console.log(`New publication setup:\t${target.collectionName}.${fnName}`);
				}

			} else if (fn.indexOf("met_") == 0 && typeof(target[fn]) == "function") {

				// Si el objeto tiene una función que empieza por met_ en minúsculas, es una Meteor Method
				let fnName = fn.substring(4);

				BinPar.methods[target.collectionName + "." + fnName] = target[fn];

				Meteor.methods({
					[target.collectionName + "." + fnName]: function (...params) {
						return target[fn].call(target, this.userId, ...params);
					}
				});

				if (Meteor.isDevelopment && Meteor.settings.showAPIDetails) {
					console.log(`New meteor methods:\t${target.collectionName}.${fnName}`);
				}
			}
		}

		let collDef = target.collection==Meteor.users?BinPar.DB[target.collectionName]:target.collection;

		for (let fn in collDef) {

			if (fn.indexOf("query_") == 0 && typeof(collDef[fn]) == "function") {

				// Si la colección tiene una función que empieza por query_ en minúsculas, es una Consulta (concepto propio del API de BinPar)
				let fnName = fn.substring(6);

				if (BinPar.queries[target.collectionName + "." + fnName]) console.error(`There is another publication as query called ${target.collectionName + "." + fnName}`);

				BinPar.queries[target.collectionName + "." + fnName] = collDef[fn];

				Meteor.publish(target.collectionName + "." + fnName, function (...params) {
					return collDef[fn].call(collDef, this.userId, ...params);
				});

				if (Meteor.isDevelopment && Meteor.settings.showAPIDetails) {
					console.log(`New query setup:\t${target.collectionName}.${fnName}`);
				}
			}
		}
	}

	fixturesRequired() {
		return this.collection.find({}).count() == 0;
	}

	//Método por defecto necesario para el Autoform
	met_getDocumentById(userId, id) {
		return this.collection.findOne({ _id: id });
	}
}

Meteor.methods({setupBinParAPI: () => {return { methods: Object.keys(BinPar.methods), publications:  Object.keys(BinPar.publications), queries:  Object.keys(BinPar.queries)}}});