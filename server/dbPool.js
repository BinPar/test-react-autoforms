import mongodb from 'mongodb';
import Future from 'fibers/future';

export default class DbPool {

	constructor(dbUri, poolSize){
		this._databaseURI = dbUri || Meteor.settings.private.connectionString;
		this._poolSize = poolSize || Meteor.settings.private.dbPoolSize;
		this._pool = [];
		this._nextIndex = 0;
		// this._initPool(); no es necesario inicializar el pool completo, se irá haciendo dinámicamente
	}

	_initPool(){
		let size = this._poolSize;
		for(let i = 0; i < size; i++){
			if(!this._createNewConnectionAtIndex(i)){
				console.log('Hubo un error al crear la nueva conexión en el index: ' + i);
			}
		}
	}

	_createNewConnectionAtIndex(index){
		let future = new Future();
		mongodb.MongoClient.connect(this._databaseURI, (err, db) => {
			if(err){
				console.log(err);
				future.return(false);
			}
			else{
				this._pool[index] = db;
				this._pool[index].on('close', ()=>{
					this._pool[index] = null;
				});
				this._pool[index].on('timeout', ()=>{
					this._pool[index] = null;
				});
				future.return(true);
			}
		});
		return future.wait();
	}

	_checkConnectionAtIndex(index) {
		if(this._pool[index] == null){
			return this._createNewConnectionAtIndex(index);
		}
		else{
			return true;
		}
	}

	_getNextIndex(){
		let index = this._nextIndex++;
		if(this._nextIndex === this._poolSize){
			this._nextIndex = 0;
		}
		return index;
	}

	getConnection(){
		let nextIndex = this._getNextIndex();
		if(this._checkConnectionAtIndex(nextIndex)){
			return this._pool[nextIndex];
		}
		else{
			throw new Meteor.Error('Error en la conexión a mongodb. No se pudo refrescar el socket');
		}
	}

}