import Collection from "./Collection";

export default class Demands extends Collection {

	constructor() {
		super("demands");
	}

	getSchema() {
		return new SimpleSchema({
			demand_id: {
				type: String,
				label: 'Demand ID'
			},
			candidate_id: {
				type: String,
				label: 'Candidate ID'
			},
			available_from: {
				type: Date,
				optional: true,
				label: 'Disponible desde'
			},
			available_to: {
				type: Date,
				optional: true,
				label: 'Disponible hasta'
			},
			salary_per_month: {
				type: Number,
				optional: true,
				label: 'Salario por mes'
			},
			about: {
				type: String,
				optional: true,
				label: 'Descripción'
			},
			published: {
				type: Boolean,
				label: 'Publicada'
			},
			approved: {
				type: Boolean,
				label: 'Aprobada'
			},
			deleted: {
				type: Boolean,
				optional: true,
				label: 'Eliminada'
			},
			locations: {
				type: [String],
				optional: true
			}
		});
	}
}
