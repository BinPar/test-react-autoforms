import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';
import BinPar from '../../main';

export default new class Offers extends ServerCollectionAPI {

	constructor() {
		super("offers");
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Offers.hasPermission(userId);
			},
			'update': function (userId) {
				return Offers.hasPermission(userId);
			},
			'remove': function (userId) {
				return Offers.hasPermission(userId);
			}
		}
	}

	static hasPermission (userId)
	{
		return Roles.userIsInRole(userId, [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.FAMILY]);
	}
}
