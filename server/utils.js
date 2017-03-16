import {pad} from '../both/utils';

let _getRandomString = () => {
	return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
};

export function getRandomCode(length) {
	if(!length){
		return _getRandomString();
	}
	let res = '';
	while (res.length < length){
		let rndStr = _getRandomString();
		let lRndStr = rndStr.length;
		let nCharMissed = length - res.length;
		if(nCharMissed < lRndStr){
			res += rndStr.substr(0,nCharMissed);
		}
		else{
			res += rndStr;
		}
	}
	return res;
}

export function dateToMySQLDateTimeString(date) {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}+${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}