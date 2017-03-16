import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';
import BinPar from '../../main';
import casual from 'casual';

export default new class Messages extends ServerCollectionAPI {

	constructor() {
		super("messages");
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Messages.hasPermission(userId);
			},
			'update': function (userId) {
				return Messages.hasPermission(userId);
			},
			'remove': function (userId) {
				return Messages.hasPermission(userId);
			}
		}
	}

	static hasPermission (userId)
	{
		return Roles.userIsInRole(userId, [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.FAMILY]);
	}

}