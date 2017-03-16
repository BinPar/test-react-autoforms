import Collection from "./Collection";
import { CONST_LANGUAGES } from '../utils';
export default class Constants extends Collection {

	constructor() {
		super("constants");
	}

	getSchema() {
		return new SimpleSchema({
			group: {
				type: String,
				optional: true
			},
			key: {
				type: String,
				optional: true
			},
			value: {
				type: Object,
				optional: true,
				blackbox: true
			},
			lang: {
				type: String,
				allowedValues: CONST_LANGUAGES
			},
			index: {
				type: Number,
				optional: true
			}
		});
	}
}
