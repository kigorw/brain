var SHORT_DAY_NAMES = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
var UPPER_SHORT_DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
var DAY_NAMES = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];
var MONTHES = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
var MONTHES_ = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var MONTHES_SHORT = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];  

var TO_SHORT_DATE = function(date) {
      var result = DateUtil.d01(date.getDate())+" "+MONTHES_SHORT[date.getMonth()]+" "+date.getFullYear();
	  return result;
}
var PARSE_SHORT_DATE = function(str) {
     var d = str.split(" ");  
 		try{
 			var m = parseInt(MONTHES_SHORT.indexOf(d[1].toLowerCase()), 10)+1,
 			    day = parseInt(d[0], 10);
 			    
 			var date = new Date(m+"/"+day+"/"+d[2]);
 			return date;

 		} catch(e) {
 			return null; 
 		} 
}


var DateUtil = {
    shortDate: function(date) {
        return TO_SHORT_DATE(date);
    },
    parseShortDate: function(str) {
      return PARSE_SHORT_DATE(str);  
    },
	validTime:function(str) {
		return str.match(/(([0-1]?[0-9])|([2][0-3]))(:([0-5]?[0-9]))?(:([0-5]?[0-9]))?/); 
	},
    parseTime:function(str) {
		 if(!DateUtil.validTime(str)) return null;
		 var parts = str.split(":"), 
		     h = parseInt(parts, 10),
		     m = 0;
		 if(parts.length!=1) {
		     m = parseInt(parts[1], 10);   
		 }  
		 return {m: m, h: h}; 
	},                        
    formatTime:function(time) {
		function d(val) { return (val<10)?"0"+val: val.toString();}
		return d(time.h)+":"+d(time.m);
	},
	formatParseTime: function(str) {
	   var time = DateUtil.parseTime(str);
	   if(!time) return "";
	   return DateUtil.formatTime(time);  
	},
	validDate: function(d)
	{
		return d instanceof Date && isFinite(d)
	},
	monthIndex: function(str) {
		return $.inArray(str, MONTHES);
	},
	nextMonth: function(current, inc) {
		var cand = current+inc;
		if(cand==-1) return 11;
		if(cand==12) return 0;
		return cand;
		
	},
	nextMonthStr: function(current, inc) {
		var index = DateUtil.nextMonth(current, inc);
		return MONTHES[index];
	},
	getDayName: function(date) {
		return DAY_NAMES[DateUtil.getWeekDay(date)];
	},
	getShortDayName: function(i)
	{
		return SHORT_DAY_NAMES[i];
	},
	getUpperShortDayName: function(i)
	{   
	    //i++	    
	    //if(i==7) i = 0; 
		
		return UPPER_SHORT_DAY_NAMES[i];
	},
	getShortMonthName: function(i)
	{
		return MONTHES_SHORT[i];
	},
    dateToString: function(date, withoutYear)
    {
        var result1 = date.getDate()+" "+DateUtil.getMonthName(date.getMonth());
		
        var result2 = result1 +" "+date.getFullYear();
        
        return withoutYear?result1:result2;
    },

	dateTimeToString: function(date, withoutYear)
    {
        var str = DateUtil.dateToString(date, withoutYear);
		return str+", "+DateUtil.d01(date.getHours())+":"+DateUtil.d01(date.getMinutes());

    },
	
	getWeekDay: function(date)
	{
		var day = date.getDay();
		return day==0?day = 6:day-1;
	},
	getShortDayNameByDate: function(date)
	{
		return DateUtil.getShortDayName(DateUtil.getWeekDay(date));
	},
	getMonthName: function(i)
	{
		return MONTHES[i];
	},
	getMonthName_: function(i)
	{
		return MONTHES_[i];
	},
	dayMonth: function(date)
	{
		return date.getDate()+" "+DateUtil.getMonthName_(date.getMonth());
	},
	addDaysToDate: function(date, addDays)
	{
        var tomorrow = new Date(date);
        //a = new Date();
        tomorrow.setDate(tomorrow.getDate()+addDays);
        //tomorrow.setTime(tomorrow.getTime() + 1000*3600*24*addDays);
		return tomorrow;
	},
    addMonthToDate: function(date, addMonth)
    {
        return new Date(date.getFullYear(), date.getMonth()+addMonth, 1);
    },
	normalizeDate: function(date, d)
	{
		var daysInMonth = DateUtil.daysInMonth(date);
		if(d>daysInMonth) d = daysInMonth;
		return DateUtil.addDaysToDate(date, d-1);
	},
	smartConstructDate: function(y, m, d)
	{
		return DateUtil.normalizeDate(new Date(y, m, 1), d);
	},
	smartAddMonthToDate: function(date, inc)
	{
		return DateUtil.normalizeDate(DateUtil.addMonthToDate(date, inc), date.getDate());
	},
	changeDay: function(date, day)
	{
		return new Date(date.getFullYear(), date.getMonth(), day);
	},
	cloneDate: function(date)
	{
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	},
	daysBetween: function(startDate, endDate)
	{
		var msPerDay = 24 * 60 * 60 * 1000;
		var daysLeft = (endDate.getTime() - startDate.getTime()) / msPerDay;
		return Math.round(daysLeft); 
	},
	daysInMonth: function(date)
	{
		return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
	},
	
	numOfFirstDayOfMonthInWeek: function(date)
	{
		return DateUtil.getWeekDay(DateUtil.getFirstDayOfMonth(date));
	},
	numOfLastDayOfMonthInWeek: function(date)
	{
		return DateUtil.getWeekDay(DateUtil.getLastDayOfMonth(date));
	},
	d01: function(d)
	{
		return parseInt(d)<10?"0"+parseInt(d).toString():d;
	},
	toYMD: function(date){
		var z = DateUtil.d01;
		
        return {month: z(date.getMonth()+1), day: z(date.getDate()), year: z(date.getFullYear())};
	},
	toServerDate: function(date)
	{
		return DateUtil.toSlashString(date);
		var d = DateUtil.toYMD(date);
		return d.day+"/"+d.month+"/"+d.year;
	},
	toServerDate2: function(date) {
		var d = DateUtil.toYMD(date);
		return d.year+"/"+d.month+"/"+d.day;
	},
	fromServerDate2: function(s) {
		var d = s.split("/");
		try{
			var m = parseInt(d[1], 10);
			var date = new Date(d[0]+"/"+m+"/"+d[2]);
			return date;
			
		} catch(e) {
			return null; 
		}
	},
	
	toServerDateTime: function(d)
	{
		var m = (d.getMonth()+1);
		return d.getFullYear()+"/"+m+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	},
	toSlashString: function(date)
    {
		var d = DateUtil.toYMD(date);
        return d.month+"/"+d.day+"/"+d.year;
    },
	getFirstDayOfWeek: function(date)
	{
		var dayOfWeek = date.getDay();
		return DateUtil.addDaysToDate(date, -dayOfWeek+1);
	},
	getFirstDayOfMonth: function(date)
	{
		return new Date(date.getFullYear(), date.getMonth(), 1);
	},
	getLastDayOfMonth: function(date)
	{
		return new Date(date.getFullYear(), date.getMonth(), DateUtil.daysInMonth(date));
	},
	isNOW: function(date)
	{
		return DateUtil.isEqual(date, NOW||new Date());
	},
	isEqual: function(d1, d2)
	{
		return d1.getFullYear()==d2.getFullYear()&&
		       d1.getMonth()==d2.getMonth()&&
			   d1.getDate()==d2.getDate();
	}

};
