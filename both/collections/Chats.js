import Collection from "./Collection";
export default class Chats extends Collection {

	constructor() {
		super("chats");
	}

	getSchema() {
		return new SimpleSchema({
			candidateId: {
				type: String,
				optional: true
			},
			candidateName: {
				type: String
			},
			candidateImage: {
				type: String,
				optional: true
			},
			familyId: {
				type: String,
				optional: true
			},
			familyName: {
				type: String
			},
			offerId: {
				type: String,
				optional: true
			},
			lastActivity: {
				type: Date
			},
			lastMessage: {
				type: String,
				optional: true
			},
			candidateUnreadMessages: {
				type: Number,
				optional: true,
				defaultValue: 0
			},
			familyUnreadMessages: {
				type: Number,
				optional: true,
				defaultValue: 0
			},
			deleted: {
				type: Boolean,
				defaultValue: false
			},
			creationDate: {
				type: Date,
				label: "Creation date",
				autoValue: function () {
					if (this.isInsert) {
						return new Date();
					} else if (this.isUpsert) {
						return new Date();
					} else {
						this.unset();
					}
				}
			}

		});
	}
}
