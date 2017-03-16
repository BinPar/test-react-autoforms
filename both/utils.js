export const CONST_LANGUAGES = ['es', 'en'];

export function pad(input, padChar, totalLength, side){
	input = input + '';
	padChar = padChar || '0';
	totalLength = totalLength || 2;
	side = side || 'left';
	let strPadChars = new Array(totalLength+1).join(padChar);
	switch(side){
		case 'left':
			return (strPadChars + input).slice(-totalLength);
		case 'right':
			return (input + strPadChars).slice(0, totalLength);
	}
}

export function leftPad(input, padChar, totalLength){
	return pad(input, padChar, totalLength, 'left');
}

export function rightPad(input, padChar, totalLength){
	return pad(input, padChar, totalLength, 'right');
}

export function validateDNINIE(dni) {
	let numero, _let, letra;
	let expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

	dni = dni.toUpperCase();

	if(expresion_regular_dni.test(dni) === true){
		numero = dni.substr(0,dni.length-1);
		let nie = /^[XYZ]/.test(numero);
		numero = numero.replace('X', '0');
		numero = numero.replace('Y', '1');
		numero = numero.replace('Z', '2');
		_let = dni.substr(dni.length-1, 1);
		numero = numero % 23;
		letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
		letra = letra.substring(numero, numero+1);
		return {valid: (letra == _let), nie: nie};
	}
	else {
		return {valid: false, nie: false};
	}
}

export function toArrayBuffer(buffer) {
	let ab = new ArrayBuffer(buffer.length);
	let view = new Uint8Array(ab);
	for (let i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab;
}

export function toBuffer(ab) {
	let buffer = new Buffer(ab.byteLength);
	let view = new Uint8Array(ab);
	for (let i = 0; i < buffer.length; ++i) {
		buffer[i] = view[i];
	}
	return buffer;
}
