import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES, API_URLS, API_VERSION_KEY, API_PRIVAY_POLICY_KEY, API_TERMS_KEY } from '../../../server/constants';
import { CONST_LANGUAGES } from '../../utils';
import BinPar from "../../main";

export default new class Constants extends ServerCollectionAPI {

	constructor() {
		super("constants");
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Constants.hasPermission(userId);
			},
			'update': function (userId) {
				return Constants.hasPermission(userId);
			},
			'remove': function (userId) {
				return Constants.hasPermission(userId);
			}
		}
	}

	createFixtures() {
		let version = null;
		let bulk = BinPar.dbPool.getConnection().collection('constants').initializeUnorderedBulkOp();
		CONST_LANGUAGES.forEach((lang) => {
			const LOCALIZED_API_URLS = API_URLS(lang);
			let lastFfApiVersionObj = this.collection.findOne({key: API_VERSION_KEY});
			let lastFfApiVersion = '1';
			if(lastFfApiVersionObj) {
				lastFfApiVersion = lastFfApiVersionObj.value;
			}
			let initial = doGetRequest(`${LOCALIZED_API_URLS.INITIAL}?version=${lastFfApiVersion}`);
			if (initial.appInfo) {
				bulk.find({lang: lang, group: API_TERMS_KEY}).upsert().update({ $setOnInsert: {_id: Random.id()}, $set: { lang: lang, group: API_TERMS_KEY, value: initial.appInfo.urlTerms }});
				bulk.find({lang: lang, group: API_PRIVAY_POLICY_KEY}).upsert().update({ $setOnInsert: {_id: Random.id()}, $set: { lang: lang, group: API_PRIVAY_POLICY_KEY, value: initial.appInfo.urlPoliticaPrivacidad }});
			}
			let initialResponse = doGetRequest(LOCALIZED_API_URLS.DATA.CONSTANTS);
			if (!(initialResponse && initialResponse.status && initialResponse.status.code === 'OK')) {
				initialResponse = JSON.parse(Assets.getText(`constants_${lang}.json`));
			}
			version = initialResponse.version;
			let keys = Object.keys(initialResponse);
			for (let i = 0, l = keys.length; i < l; i++) {
				let key = keys[i];
				let value = initialResponse[key];
				key = key.toUpperCase();
				if(key !== 'STATUS' || key !== 'VERSION') {
					if(value instanceof Array) {
						for (let j = 0, l2 = value.length; j < l2; j++) {
							let obj = value[j];
							if(obj.id) {
								bulk.find({lang: lang, group: key, key: obj.id}).upsert().update({ $setOnInsert: {_id: Random.id()}, $set: { lang: lang, group: key, key: obj.id, value: obj, index: j }});
							}
						}
					}
					else{
						bulk.find({lang: lang, group: key}).upsert().update({$setOnInsert: {_id: Random.id()}, $set: { lang: lang, group: key, value: value }});
					}
				}
			}
		});
		bulk.find({key: API_VERSION_KEY}).upsert().update({$setOnInsert: {_id: Random.id()}, $set: { key: API_VERSION_KEY, value: version }});
		let executionStart = new Date().getTime();
		console.log(`START constants bulk execution`);
		bulk.execute().then((res)=>{
			console.log(`END bulk. Execution time (ms): ${new Date().getTime() - executionStart}`);
			console.log(`Constants updated: ${res.nModified} | Constants created: ${res.nUpserted}`);
		});
	}

	static hasPermission (userId)
	{
		return Roles.userIsInRole(userId, [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.FAMILY]);
	}

	met_getAllConstants() {
		return this.collection.find({}).fetch();
	}

	met_getConstantsObject() {
		let res = {};
		let all = this.collection.find({"value.field": { $ne: "schedule_per_hours" }}).fetch();
		for (let i = 0, l = all.length; i < l; i++) {
			let constant = all[i];
			if(constant.lang) {
				if(!res[constant.lang]) {
					res[constant.lang] = {};
				}
				if(!res[constant.lang][constant.group]) {
					res[constant.lang][constant.group] = {};
				}
				if(constant.key){
					res[constant.lang][constant.group][constant.key] = constant.value;
					constant.index && (res[constant.lang][constant.group][constant.key].index = constant.index);
				} else {
					res[constant.lang][constant.group] = constant.value;
					constant.index && (res[constant.lang][constant.group] = constant.index);
				}
			} else {
				res[constant.key] = constant.value;
			}
		}
		return res;
	}
}