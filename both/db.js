import Users from './collections/Users';
import Files from './collections/Files';
import Constants from './collections/Constants';
import Demands from './collections/Demands';
import Offers from './collections/Offers';
import Messages from './collections/Messages';
import Chats from './collections/Chats';

export default class DB {
	constructor() {
		this.files = new Files();
		this.constants = new Constants();
		this.demands = new Demands();
		this.offers = new Offers();
		this.chats = new Chats();
		this.messages = new Messages();
		this.users = new Users();
	}
}