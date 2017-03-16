import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';

export default new class Demands extends ServerCollectionAPI {

	constructor() {
		super("demands");
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Demands.hasPermission(userId);
			},
			'update': function (userId) {
				return Demands.hasPermission(userId);
			},
			'remove': function (userId) {
				return Demands.hasPermission(userId);
			}
		}
	}

	static hasPermission (userId)
	{
		return true;
	}

	met_getDemandById(userId, id) {
		return this.collection.findOne({ _id: id });
	}
}