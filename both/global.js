import BinParInstance from './main';
import moment from 'moment';

let es = moment.defineLocale('es', {
	months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
	monthsShort : function (m, format) {
		if (/-MMM-/.test(format)) {
			return monthsShort[m.month()];
		} else {
			return monthsShortDot[m.month()];
		}
	},
	weekdays : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
	weekdaysShort : 'Dom._Lun._Mar._Mié._Jue._Vie._Sáb.'.split('_'),
	weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
	longDateFormat : {
		LT : 'H:mm',
		LTS : 'H:mm:ss',
		L : 'DD/MM/YYYY',
		LL : 'D [de] MMMM [de] YYYY',
		LLL : 'D [de] MMMM [de] YYYY H:mm',
		LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	},
	calendar : {
		sameDay : function () {
			return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
		},
		nextDay : function () {
			return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
		},
		nextWeek : function () {
			return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
		},
		lastDay : function () {
			return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
		},
		lastWeek : function () {
			return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
		},
		sameElse : 'L'
	},
	relativeTime : {
		future : 'en %s',
		past : 'hace %s',
		s : 'unos segundos',
		m : 'un minuto',
		mm : '%d minutos',
		h : 'una hora',
		hh : '%d horas',
		d : 'un día',
		dd : '%d días',
		M : 'un mes',
		MM : '%d meses',
		y : 'un año',
		yy : '%d años'
	},
	ordinalParse : /\d{1,2}º/,
	ordinal : '%dº',
	week : {
		dow : 1, // Monday is the first day of the week.
		doy : 4  // The week that contains Jan 4th is the first week of the year.
	}
});

moment.locale('es');

BinPar = BinParInstance;

