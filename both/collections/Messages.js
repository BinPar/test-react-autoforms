import Collection from "./Collection";
export default class Messages extends Collection {

	constructor() {
		super("messages");
	}

	getSchema() {
		return new SimpleSchema({
			id: {
				type: String,
				label: 'FamiliaFacil id'
			},
			chatId: {
				type: String
			},
			ownerId: {
				type: String
			},
			ownerName: {
				type: String
			},
			message: {
				type: String
			},
			readDate: {
				type: Date,
				optional: true
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
