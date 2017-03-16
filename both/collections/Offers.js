import Collection from "./Collection";
export default class Offers extends Collection {

	constructor() {
		super("offers");
	}

	getSchema() {
		let candidates = new SimpleSchema({
			candidate_id: {
				type: String
			},
			visited: {
				type: Boolean
			}
		});

		let addressCoords = new SimpleSchema({
			lat: {
				type: Number,
				label: "Latitude",
				decimal: true
			},
			lng: {
				type: Number,
				label: "Longitude",
				decimal: true
			}
		});

		return new SimpleSchema({
			offer_id: {
				type: String,
				optional: true
			},
			family_id: {
				type: String,
				optional: true,
			},
			familyName: {
				type: String,
				optional: true,
			},
			job_type: {
				type: Number,
				optional: true,
				label: 'JOB_TYPE'
			},
			contract_type: {
				type: Number,
				optional: true,
				label: 'CONTRACT_TYPES'
			},
			available_from: {
				type: String,
				optional: true
			},
			available_to: {
				type: String,
				optional: true
			},
			salary_per_month: {
				type: Number,
				optional: true
			},
			salary_per_hour: {
				type: Number,
				optional: true
			},
			accomodation_regime_type: {
				type: Number,
				optional: true,
				label: 'REGIMES'
			},
			about: {
				type: String,
				optional: true
			},
			published: {
				type: Boolean,
				optional: true
			},
			approved: {
				type: Boolean,
				optional: true
			},
			deleted: {
				type: Boolean,
				optional: true
			},
			process_status: {
				type: Number,
				optional: true
			},
			county_woeid: {
				type: String,
				optional: true
			},
			municipality_woeid: {
				type: String,
				optional: true
			},
			local_geo_id: {
				type: String,
				optional: true
			},
			created_at: {
				type: Date,
				optional: true
			},
			updated_at: {
				type: Date,
				optional: true
			},
			published_duration_days: {
				type: Number,
				optional: true
			},
			mail_options: {
				type: Number,
				optional: true
			},
			family_membership_id: {
				type: String,
				optional: true
			},
			offer_duration: {
				type: Number,
				optional: true,
				label: 'OFFER_DURATIONS'
			},
			schedule: {
				type: [Number],
				optional: true
			},
			gender: {
				type: String,
				optional: true
			},
			high_studies: {
				type: Boolean,
				optional: true
			},
			with_references: {
				type: Boolean,
				optional: true
			},
			drive_license: {
				type: Boolean,
				optional: true
			},
			animal_acceptance_level: {
				type: String,
				optional: true,
				label: 'ANIMAL_ACCEPTANCE_LEVELS'
			},
			video: {
				type: Boolean,
				optional: true
			},
			postal_code: {
				type: String,
				optional: true
			},
			candidates: {
				type: [candidates],
				optional: true,
				defaultValue: []
			},
			tasks: {
				type: [Number],
				optional: true,
				label: 'JOB_TYPE.TASKS'
			},
			addressLocation: {
				type: addressCoords,
				optional: true
			},
			actualCandidateNumber: {
				type: Number,
				defaultValue: 0
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
		Meteor.users.update({ _id: userId }, {
			$push: {
				'profile.family.ownedOffers': {
					offer_id: doc.offer_id,
					job_type: doc.job_type,
					county_woeid: doc.county_woeid,
					municipality_woeid: doc.municipality_woeid,
					postal_code: doc.postal_code,
					addressLocation: doc.addressLocation,
					schedule: doc.schedule
				}
			}
		});
	}

	onAfterUpdate(userId, doc, fieldNames, modifier, options) {
		if(fieldNames && fieldNames.indexOf('deleted') !== -1) {
			Meteor.users.update({ _id: userId }, { $pull: {
				"profile.family.ownedOffers": { offer_id: doc.offer_id }
			}});
		} else {
			Meteor.users.update({ _id: userId, 'profile.family.ownedOffers.offer_id': doc.offer_id }, { $set: {
				"profile.family.ownedOffers.$": {
					offer_id: doc.offer_id,
					job_type: doc.job_type,
					county_woeid: doc.county_woeid,
					municipality_woeid: doc.municipality_woeid,
					postal_code: doc.postal_code,
					addressLocation: doc.addressLocation,
					schedule: doc.schedule
				}
			}});
		}
	}

	onAfterRemove(userId, doc) {
		Meteor.users.update({ _id: userId }, { $pull: {
			"profile.family.ownedOffers": { offer_id: doc.offer_id }
		}});
	}
}
