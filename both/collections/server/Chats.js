import ServerCollectionAPI from './ServerCollectionAPI';
import { ROLES } from '../../../server/constants';
import BinPar from '../../main';

export default new class Chats extends ServerCollectionAPI {

	constructor() {
		super("chats");
	}

	fixturesRequired() {
		return this.collection.find({}).count() === 0;
	}

	get permissions() {
		return {
			'insert': function (userId) {
				return Chats.hasPermission(userId);
			},
			'update': function (userId) {
				return Chats.hasPermission(userId);
			},
			'remove': function (userId) {
				return Chats.hasPermission(userId);
			}
		}
	}

	createFixtures() {
		const OFFER_IDS = ["100", "110"];

		for (let i = 0; i < 10; i++) {
			this.collection.insert({
				candidateId: 'binparTest1',
				candidateName: 'Marcos González Andrés',
				familyId: 'binparTest2',
				familyName: 'Ignacio Ferro Picón',
				lastActivity: new Date(),
				offerId: OFFER_IDS[Math.floor(Math.random() * OFFER_IDS.length)]
			});
		}
	}

	static hasPermission (userId)
	{
		return Roles.userIsInRole(userId, [ROLES.ADMIN, ROLES.CANDIDATE, ROLES.FAMILY]);
	}

	met_getChats(userId) {
		if(userId) {
			check(userId, String);
			let user = Meteor.user();
			return {chats: this.collection.find({ [`${user.profile.userType}Id`]: user.profile[user.profile.userType][`${user.profile.userType}_id`] }, {sort: {lastActivity: -1, creationDate: -1}}).fetch(), type: user.profile.userType};
		} else {
			throw new Meteor.Error(403, 'Not logged in');
		}
	}

	met_getChatIdByFamilyIdForThisUser(userId, familyId) {
		if(userId) {
			check(userId, String);
			let user = Meteor.user();
			let chat = this.collection.findOne({ familyId, candidateId: user.profile.candidate.candidate_id });
			if(chat) {
				return {
					chatId: chat._id
				};
			} else {
				throw new Meteor.Error(404, 'Chat not found');
			}
		} else {
			throw new Meteor.Error(403, 'Not logged in');
		}
	}

	met_updateChatStats(userId, chatId) {
		let chat = this.collection.findOne({ _id: chatId });
		if(!chat) {
			throw new Meteor.Error(404, 'Chat not found');
		}
		let updateObject = {
			candidateUnreadMessages: 0,
			familyUnreadMessages: 0,
			lastMessage: null,
			lastActivity: null
		};
		BinPar.DB.messages.find({ chatId }, {
			sort: {
				creationDate: -1
			},
			fields: {
				ownerId: 1,
				readDate: 1,
				message: 1,
				creationDate: 1
			}
		}).forEach((msg, i) => {
			let userType = msg.ownerId === chat.candidateId ? 'candidate' : 'family';
			updateObject[`${userType}UnreadMessages`]++;
			i == 0 && (updateObject.lastMessage = msg.message);
			let msgLastActivity = msg.readDate || msg.creationDate;
			updateObject.lastActivity < msgLastActivity && (updateObject.lastActivity = msgLastActivity);
		});
		this.collection.update({ _id: chatId }, {
			$set: {
				candidateUnreadMessages: updateObject.candidateUnreadMessages,
				familyUnreadMessages: updateObject.familyUnreadMessages,
				lastMessage: updateObject.lastMessage,
				lastActivity: updateObject.lastActivity
			}
		});
		return true;
	}

	met_getUnreadMessagesByOfferId(userId, offerId) {
		if(userId) {
			check(userId, String);
			let user = Meteor.user();
			let unreadMessages = 0;
			const userType = user.profile.userType;
			this.collection.find({ offerId, [userType + 'Id']: user.profile[userType][userType + '_id'] }).forEach((chat) => {
				unreadMessages += chat[userType + 'UnreadMessages'] || 0;
			});
			return unreadMessages;
		} else {
			throw new Meteor.Error(403, 'Not logged in');
		}
	}

	met_getChatOrCreateByCandidateId(userId, candidateId) {
		if(userId) {
			check(userId, String);
			check(candidateId, String);
			let user = Meteor.user();
			let chat = this.collection.findOne({ candidateId, familyId: user.profile.family.family_id });
			if(!chat) {
				const candidate = Meteor.users.findOne({ 'profile.candidate.candidate_id': candidateId }, {
					fields: {
						'profile.basic.name': 1,
						'profile.candidate.mainPicture': 1
					}
				});
				if(!candidate) {
					throw new Meteor.Error(404, 'Candidate not found');
				}
				console.log(candidate.profile);
				chat = {
					candidateId,
					candidateName: candidate.profile.basic.name,
					candidateImage: candidate.profile.candidate.mainPicture,
					familyId: user.profile.family.family_id,
					familyName: user.profile.basic.name,
					lastActivity: new Date(),
					offerId: null
				};
				chat._id = this.collection.insert(chat);
			}
			return {
				chatId: chat._id,
				candidateName: chat.candidateName
			}
		} else {
			throw new Meteor.Error(403, 'Not logged in');
		}
	}
}