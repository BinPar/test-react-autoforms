import BinPar from '../../main';
import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';
import casual from 'casual';

export default new class Users {

	constructor() {
		this.collectionName = "users";
		BinPar.API[this.collectionName] = this;
		this.collection = Meteor.users;
		ServerCollectionAPI.setupAPI(this);
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Users.isAdmin(userId);
			},
			'update': function (userId) {
				return Users.isAdmin(userId);
			},
			'remove': function (userId) {
				return Users.isAdmin(userId);
			}
		}
	}

	static isAdmin (userId)
	{
		return Roles.userIsInRole(userId, ROLES.ADMIN);
	}
}