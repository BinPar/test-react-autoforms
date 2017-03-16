export default class Users {

	constructor() {
		this._simpleSchema = null;
		Meteor.users.attachSchema(this.getSchema());
	}

	getSchema() {
		if(this._simpleSchema){
			return this._simpleSchema;
		}
		else {
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

			let userBasicInfo = new SimpleSchema({
				user_id: {
					type: String,
					optional: true
				},
				name: {
					type: String,
					optional: true
				},
				surname: {
					type: String,
					optional: true
				},
				phone: { // ONLY PREMIUM
					type: String,
					optional: true
				},
				phone_secondary: { // ONLY PREMIUM
					type: String,
					optional: true
				},
				know_about_us: {
					type: String,
					optional: true,
					label: 'KNOWN_ABOUT_US'
				},
				know_about_us_other: {
					type: String,
					optional: true
				},
				county_woeid: {
					type: String,
					optional: true
				},
				municipality_woeid: {
					type: String,
					optional: true,
					label: 'CITIES'
				},
				address: {	//ONLY PREMIUM
					type: String,
					optional: true
				},
				address_number: {	//ONLY PREMIUM
					type: String,
					optional: true
				},
				address_coords: {
					type: addressCoords,
					optional: true
				},
				postal_code: {
					type: String,
					optional: true
				},
				smoke: {
					type: Boolean,
					optional: true
				},
				last_login: {
					type: Date,
					optional: true
				},
				enabled: {
					type: Boolean,
					optional: true
				},
				approved: {
					type: Boolean,
					optional: true
				},
				last_signup_step_completed: {
					type: Number,
					optional: true,
					//allowedValues: [1,2,3,4]
				},
				last_review_step_completed: {
					type: Number,
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
				site_country: {
					type: String,
					optional: true
				},
				map_lat: {
					type: Number,
					decimal: true,
					optional: true
				},
				map_lon: {
					type: Number,
					decimal: true,
					optional: true
				},
				map_status: {
					type: Number,
					optional: true
				},
				membership_id: {
					type: String,
					optional: true
				},
				push_token: {
					type: String,
					optional: true
				},
				newsletter: {
					type: Boolean,
					optional: true
				}
			});

			let experiences = new SimpleSchema({
				id: {
					type: String,
					optional: true
				},
				job_type: {
					type: String,
					optional: true,
					label: 'JOB_TYPE'
				},
				job_type_other: {
					type: String,
					optional: true
				},
				regime: {
					type: String,
					optional: true,
					label: 'REGIMES'
				},
				start_date: {
					type: Date,
					optional: true
				},
				end_date: {
					type: Date,
					optional: true
				},
				description: {
					type: String,
					optional: true
				},
				leave_reason: {
					type: String,
					optional: true,
					label: 'LEAVE_REASONS'
				},
				leave_reason_other: {
					type: String,
					optional: true
				},
				mobile: {
					type: String,
					optional: true
				}, // ONLY PREMIUM
				landline: {
					type: String,
					optional: true
				}, // ONLY PREMIUM
				email: {
					type: String,
					optional: true
				}, // ONLY PREMIUM
				reference_mail_sent: {
					type: String,
					optional: true
				},
				created_at: {
					type: Date,
					optional: true
				}
			});

			let languages = new SimpleSchema({
				name: {
					type: Number,
					optional: true,
					label: 'LANGUAGES'
				},
				level: {
					type: Number,
					optional: true,
					label: 'LANGUAGE_LEVELS'
				}
			});

			let references = new SimpleSchema({
				id: {
					type: String,
					optional: true
				},
				job_type: {
					type: String,
					optional: true,
					label: 'JOB_TYPE'
				},
				regime: {
					type: String,
					optional: true,
					label: 'REGIMES'
				},
				start_date: {
					type: Date,
					optional: true
				},
				end_date: {
					type: Date,
					optional: true
				},
				leave_reason: {
					type: String,
					optional: true
				},
				reference: {
					type: String,
					optional: true
				},
				rating: {
					type: Number,
					optional: true
				},
				employer_name: {
					type: String,
					optional: true
				},
				employer_surname: {
					type: String,
					optional: true
				},
				employer_phone: {
					type: String,
					optional: true
				}, // ONLY PREMIUM
				employer_email: {
					type: String,
					optional: true
				}, // ONLY PREMIUM
				status: {
					type: Boolean,
					optional: true
				},
				reported: {
					type: Boolean,
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
				tutor_id: {
					type: String,
					optional: true
				}
			});

			let candidateInfo = new SimpleSchema({
				candidate_id: {
					type: String,
					optional: true
				},
				birth: {
					type: Date,
					optional: true
				},
				gender: {
					type: String,
					optional: true,
					allowedValues: ['m', 'f']
				},
				birth_country_woeid: {
					type: String,
					optional: true
				},
				arrival_date: {
					type: Date,
					optional: true
				},
				work_permission_status: {
					type: Number,
					optional: true,
					label: 'WORK_PERMISSION_STATUS'
				},
				work_permission_expiration: {
					type: String,
					optional: true
				},
				id_card_type: {
					type: Number,
					optional: true,
					label: 'ID_CARD_TYPES'
				},
				id_number: {
					type: String,
					optional: true
				},
				avatar_id: {
					type: String,
					optional: true
				},
				swimmer: {
					type: Boolean,
					optional: true
				},
				drive_license: {
					type: Boolean,
					optional: true
				},
				car_ownership: {
					type: Boolean,
					optional: true
				},
				marital_status: {
					type: String,
					optional: true,
					label: 'MARITAL_STATUS'
				},
				employers_spain: {
					type: String,
					optional: true
				},
				work_report_id: {
					type: String,
					optional: true
				},
				studies_level: {
					type: Number,
					optional: true
				},
				studies_length: {
					type: String,
					optional: true,
					label: 'STUDY_LEVELS'
				},
				studies_name: {
					type: String,
					optional: true
				},
				other_studies: {
					type: String,
					optional: true
				},
				studies: {
					type: [Number],
					optional: true
				},
				first_aid_course: {
					type: Boolean,
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
				mail_option: {
					type: Number,
					optional: true
				},
				score: {
					type: Number,
					optional: true
				},
				entity_id: {
					type: String,
					optional: true
				},
				experiences: {
					type: [experiences],
					optional: true
				},
				languages: {
					type: [languages],
					optional: true
				},
				references: {
					type: [references],
					optional: true
				},
				offersSignedUp: {
					type: [String],
					optional: true,
					defaultValue: []
				},
				offersHidden: {
					type: [String],
					optional: true,
					defaultValue: []
				},
				jobTypesLookingFor: {
					type: [String],
					optional: true
				},
				schedulesLookingFor: {
					type: [String],
					optional: true
				},
				provincesLookingFor: {
					type: [String],
					optional: true
				},
				offersVisited: {
					type: [String],
					optional: true
				},
				years_of_experience: {
					type: Number,
					optional: true
				},
				mainPicture: {
					type: String,
					optional: true
				},
				ownedDemands: {
					type: Array,
					optional: true
				},
				'ownedDemands.$': {
					type: Object,
					optional: true
				},
				'ownedDemands.$.demand_id': {
					type: String,
					optional: true
				},
				'ownedDemands.$.job_type': {
					type: String,
					optional: true
				},
				'ownedDemands.$.locations': {
					type: [Number],
					optional: true
				},
				'ownedDemands.$.schedule': {
					type: [Number],
					optional: true
				},
				timesVisited: {
					type: Number,
					optional: true
				}
			});

			let subscription = new SimpleSchema({
				id: {
					type: String,
					optional: true
				},
				pan_mask: {
					type: String,
					optional: true
				},
				expiration_date: {
					type: Date,
					optional: true
				},
				status: {
					type: Number,
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
				cancellation_date: {
					type: Date,
					optional: true
				},
				amount_no_vat: {
					type: Number,
					optional: true,
					decimal: true
				},
				amount_vat: {
					type: Number,
					optional: true,
					decimal: true
				},
				braintree_payment_token: {
					type: String,
					optional: true
				},
				braintree_subscription_id: {
					type: String,
					optional: true
				}
			});

			let membership_extra = new SimpleSchema({
				is_expired: {
					type: Boolean,
					optional: true
				},
				type: {
					type: Number,
					optional: true
				},
				days_left: {
					type: Number,
					optional: true
				},
				status: {
					type: Number,
					optional: true
				},
				tramit: {
					type: Number,
					optional: true
				}
			});

			let memberships = new SimpleSchema({
				membership_id: {
					type: String,
					optional: true
				},
				expiration_date: {
					type: Date,
					optional: true
				},
				county_woeid: {
					type: String,
					optional: true
				},
				created_at: {
					type: Date,
					optional: true
				},
				payment_id: {
					type: String,
					optional: true
				},
				status: {
					type: Number,
					optional: true
				},
				subscription: {
					type: subscription,
					optional: true
				},
				extra_details: {
					type: membership_extra,
					optional: true
				}
			});

			let favourites = new SimpleSchema({
				candidate_id: {
					type: String,
					optional: true
				},
				rating: {
					type: Number,
					optional: true
				},
				comment: {
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
				}
			});

			let hidden = new SimpleSchema({
				candidate_id: {
					type: String,
					optional: true
				},
				created_at: {
					type: Date,
					optional: true
				},
			});

			let familyInfo = new SimpleSchema({
				family_id: {
					type: String,
					optional: true
				},
				adults: {
					type: Number,
					optional: true
				},
				adults_with_attention_selector: {
					type: Boolean,
					optional: true
				},
				adults_with_attention: {
					type: String,
					optional: true
				},
				dogs: {
					type: Number,
					optional: true
				},
				cats: {
					type: Number,
					optional: true
				},
				birds: {
					type: Number,
					optional: true
				},
				rodents: {
					type: Number,
					optional: true
				},
				farm_animals: {
					type: Number,
					optional: true
				},
				house_type: {
					type: Number,
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
				bo_call: {
					type: Boolean,
					optional: true
				},
				memberships: {
					type: [memberships],
					optional: true
				},
				favourites: {
					type: [favourites],
					optional: true
				},
				hidden: {
					type: [hidden],
					optional: true,
					defaultValue: []
				},
				childrens: {
					type: Array,
					optional: true
				},
				'childrens.$': {
					type: Object,
					optional: true
				},
				'childrens.$.year': {
					type: Number,
					optional: true
				},
				'childrens.$.attentions': {
					type: String,
					optional: true
				},
				ownedOffers: {
					type: Array,
					optional: true,
					defaultValue: []
				},
				'ownedOffers.$': {
					type: Object,
					optional: true
				},
				'ownedOffers.$.offer_id': {
					type: String,
					optional: true
				},
				'ownedOffers.$.job_type': {
					type: String,
					optional: true
				},
				'ownedOffers.$.county_woeid': {
					type: String,
					optional: true
				},
				'ownedOffers.$.municipality_woeid': {
					type: String,
					optional: true
				},
				'ownedOffers.$.postal_code': {
					type: Number,
					optional: true
				},
				'ownedOffers.$.addressLocation': {
					type: Object,
					optional: true,
					blackbox: true
				},
				'ownedOffers.$.schedule': {
					type: [Number],
					optional: true,
					defaultValue: []
				}
			});

			let profile = new SimpleSchema({
				basic: {
					type: userBasicInfo
				},
				candidate: {
					type: candidateInfo,
					optional: true
				},
				family: {
					type: familyInfo,
					optional: true
				},
				files: {
					type: [String],
					optional: true
				},
				images: {
					type: [String],
					optional: true
				},
				userToken: {
					type: String,
					optional: true
				},
				lang: {
					type: String,
					optional: true
				},
				userPushToken: {
					type: String,
					optional: true
				},
				os: {
					type: String,
					optional: true
				},
				userType: {
					type: String,
					optional: true,
					allowedValues: ['candidate', 'family']
				},
				deleted: {
					type: Boolean,
					defaultValue: false
				}
			});

			this._simpleSchema = new SimpleSchema({
				username: {
					type: String,
					optional: true,
					label: "Nombre de usuario"
				},
				emails: {
					type: Array,
					label: "Emails"
				},
				"emails.$": {
					type: Object,
					optional: true
				},
				"emails.$.address": {
					type: String,
					label: "Correo electrónico",
					regEx: SimpleSchema.RegEx.Email
				},
				"emails.$.verified": {
					type: Boolean,
					label: "Verificado",
					defaultValue: false
				},
				createdDate: {
					type: Date,
					label: "Fecha alta",
					optional: true,
					autoValue: function () {
						if (this.isInsert) {
							return new Date();
						} else if (this.isUpsert) {
							return new Date();
						} else {
							this.unset();
						}
					}
				},
				profile: {
					type: profile
				},
				services: {
					type: Object,
					optional: true,
					blackbox: true
				},
				roles: {
					type: [String],
					optional: true,
					label: "Roles"
				},
				heartbeat: {
					type: Date,
					optional: true
				}
			});
			return this._simpleSchema;
		}
	}
}
