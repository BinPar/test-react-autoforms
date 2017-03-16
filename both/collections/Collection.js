import { DEFAULT_LIMIT } from '../constants';
export default class Collection extends Mongo.Collection {

	constructor(collectionName)
	{

		super(collectionName);

		Object.defineProperty(this, '__collectionName', {
			value: collectionName,
			writable:false
		});	//usado para backups no modificable

		if(!this.getSchema) throw (`It is required to define a Schema for the class: ${this.constructor.name}`);

		this.attachSchema(this.getSchema());

		this.before.insert(this.onBeforeInsert);
		this.before.update(this.onBeforeUpdate);
		this.before.remove(this.onBeforeRemove);
		this.before.upsert(this.onBeforeUpsert);

		this.after.insert(this.onAfterInsert);
		this.after.update(this.onAfterUpdate);
		this.after.remove(this.onAfterRemove);

		this.before.find(this.onBeforeFind);
		this.after.find(this.onAfterFind);
		this.before.findOne(this.onBeforeFindOne);
		this.after.findOne(this.onAfterFindOne);
	}

	onBeforeInsert (userId, doc) {}
	onBeforeUpdate (userId, doc, fieldNames, modifier, options) {}
	onBeforeRemove (userId, doc) {}
	onBeforeUpsert (userId, doc, fieldNames, modifier, options) {}

	onAfterInsert (userId, doc) {}
	onAfterUpdate (userId, doc, fieldNames, modifier, options) {}
	onAfterRemove (userId, doc) {}

	onBeforeFind (userId, selector, options) {}
	onAfterFind (userId, selector, options, cursor) {}
	onBeforeFindOne (userId, selector, options) {}
	onAfterFindOne (userId, selector, options, doc) {}

	query_list(userId, filter, sort, limit, skip) {
		filter = filter || {};
		sort = sort || {};
		limit = limit || DEFAULT_LIMIT;
		skip = skip || 0;
		check(filter, Object);
		check(sort, Object);
		check(limit, Number);
		check(skip, Number);
		return this.find(filter, { sort, skip, limit });
	}

}