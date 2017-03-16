import Collection from "./Collection";
export default class Files extends Collection {

	constructor() {
		super("files");
	}

	getSchema() {
		return new SimpleSchema({
			id: {
				type: String
			},
			owner_id: {
				type: String
			},
			url: {
				type: String
			},
			own_url: {
				type: String,
				optional: true
			},
			icon: {
				type: String,
				optional: true
			},
			is_new_avatar: {
				type: Boolean,
				optional: true
			},
			isMainImage: {
				type: Boolean,
				optional: true
			},
			type: {
				type: String
			},
			approved: {
				type: Boolean,
				optional: true
			},
			creationDate: {
				type: Date,
				label: "Fecha alta",
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

	onAfterInsert(userId, doc) {
		let type = doc.type === 'img' ? 'images' : 'files';
		Meteor.users.update({ _id: userId }, { $push: {
			['profile.' + type]: doc.id
		}});
	}

	onAfterRemove(userId, doc) {
		let type = doc.type === 'img' ? 'images' : 'files';
		Meteor.users.update({ _id: userId }, { $pull: {
			['profile.' + type]: doc.id
		}});
	}
}
