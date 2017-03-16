import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';

export default new class Files extends ServerCollectionAPI {

	constructor() {
		super("files");
	}

	fixturesRequired() {
		return false;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Files.hasPermission(userId);
			},
			'update': function (userId) {
				return Files.hasPermission(userId);
			},
			'remove': function (userId) {
				return Files.hasPermission(userId);
			}
		}
	}

	static hasPermission (userId)
	{
		return Roles.userIsInRole(userId, [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.FAMILY]);
	}

	met_getFileByIdTest(userId, fileId) {
		check(fileId, String);
		return this.collection.findOne({_id: fileId});
	}

	met_getFilesByOwnerId(userId, owner_id) {
		check(owner_id, String);
		return {
			mainImage: this.collection.findOne({ owner_id, isMainImage: true, type: 'img' }),
			images: this.collection.find({ owner_id, isMainImage: false, type: 'img' }).fetch()
		}
	}
}