

import { format, addMinutes, subMinutes, subWeeks, subDays, subMonths, startOfToday, endOfToday, isValid, endOfYesterday, addDays } from 'date-fns';
import * as moment from 'node_modules/moment/moment';

export class DateUtils {

  static now(): Date {
    return new Date();
  }

  static addDa(date: any) {
    return addDays(date, 1);
  }

  static isValid(date: any): Boolean {
    return isValid(new Date(date));
  }


  static getMMMMDY(date: any) {
    return format(date, 'MMM dd, yyyy');

  }

  static formatDate(date: any) {
    let lala = this.getLocalMMDDYYYYhhmmssA(date);
    return format(date, 'MMM dd, yyyy hh:mm:ss a');

  }


  static getLocalhhmmA(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      try {
        const localDate = new Date(date);
        // const utcDate = Date.parse(date);
        // const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'hh:mm a');
      } catch (e) {
      }
    }
    return '';
  }


  // input utc as '2017-12-04 07:23:56+00:00' or any valid parseable date as string
  // out local as '2017-12-04 02:23:56'
  static getLocalYYYYMMDDHHmmss(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'MMM, dd, yyyy, hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  // input utc as '2017-12-04 07:23:56+00:00' or any valid parseable date as string
  // out local as '2017-12-04 02:23:56'
  static getLocalMMDDYYYYhhmmssA(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'MMM, dd, yyyy, hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  static getLocalMMDDYYYYhhmmssATime(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'HH:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getLocalMMDDYYYYhhmmssATimee(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  // input utc as '2017-12-04 07:23:56+00:00' or any valid parseable date as string
  // out local as '2017-12-04 02:23:56'
  static getLocalMMDDYYYYhhmmssAwithDay(date: string): string {
    if (date) {
      date = date.replace('+00:00', '');
      let options: any = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        // return format(localDate, 'MMM, DD, YYYY, hh:mm:ss A');
        return localDate.toLocaleDateString('en-EN', options);
      } catch (e) {
      }
    }
    return '';
  }

  // input local as '2017-12-04 02:23:56' or any valid parseable date as string
  // out utc as '2017-12-04 07:23:56'  2018-01-01T01:00
  static getUTCYYYYMMDDHHmmsstemp(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, new Date().getTimezoneOffset());
        return format(localDate, 'yyyy-MM-ddThh:mm');
      } catch (e) {
      }
    }
    return '';
  }

  static getUTCYYYYMMDDHHmmss(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, new Date().getTimezoneOffset());
        return format(localDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getLocalYYYYMMDDHHmmssA(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, -(new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy:MM:dd : hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  static getLocalMMDDYYYYhhmmss(date: any) {
    if (date) {
      try {
        var local = moment(moment.unix(date).format('MMM dd, yyyy hh:mm:ss a'), ['MMM dd, yyyy hh:mm:ss a']);
        return (moment(local).format('MMM dd, yyyy, hh:mm:ss a'));
      } catch (e) {
      }
    }
    return '';
  }


  static getMMDDYYYYhhmmssA(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'MMM dd, yyyy, hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  static convertDateToLocal(date: any) {
    var local = moment(moment.unix(date).format('MMM dd, yyyy hh:mm a'), ['MMM dd, yyyy hh:mm a']);
    return moment(local).format('MMM dd, yyyy');
  }

  static convertDateTimeToLocal(date: any) {
    date = new Date(date).getTime() / 1000;
    var local = moment(moment.unix(date).format('MMM dd, yyyy hh:mm a'), ['MMM dd, yyyy hh:mm a']);
    return moment(local).format('MMM dd, yyyy, hh:mm:ss a');
  }

  static convertUnix(date: any) {
    // returns 1/1/2001
    // date = new Date(date * 1000);
    // var local = date.toLocaleDateString("en-US")
    // return local;

    const unixTimestamp = date
    const milliseconds = date * 1000
    const dateObject = new Date(milliseconds)

    const humanDateFormat = dateObject.toLocaleString("en-US", { month: "long" }) + ' ' +
      dateObject.toLocaleString("en-US", { day: "numeric" }) + ', ' +
      dateObject.toLocaleString("en-US", { year: "numeric" }) + ', ' +
      dateObject.toLocaleString("en-US", { hour: "numeric" }) + ':' +
      dateObject.toLocaleString("en-US", { minute: "numeric" });
    return humanDateFormat;
  }

  static getYYYY(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'yyyy');
      } catch (e) {
      }
    }
    return '';
  }

  static getMMM(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'MMM');
      } catch (e) {
      }
    }
    return '';
  }

  static getDD(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'dd');
      } catch (e) {
      }
    }
    return '';
  }

  static getMMMYY(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'MMM-yy');
      } catch (e) {
      }
    }
    return '';
  }

  static getMMMYYYY(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'MMM-yyyy');
      } catch (e) {
      }
    }
    return '';
  }

  static getDDMMM(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'dd-MMM');
      } catch (e) {
      }
    }
    return '';
  }

  static gethhmmssA(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        const utcDate = addMinutes(localDate, new Date().getTimezoneOffset());
        return format(utcDate, 'hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static gethhmmssAA(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        const utcDate = addMinutes(localDate, new Date().getTimezoneOffset());
        return format(utcDate, 'hh:mm:ss a');
      } catch (e) {
      }
    }
    return '';
  }

  static gethhmmAA(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        const utcDate = addMinutes(localDate, new Date().getTimezoneOffset());
        return format(utcDate, 'hh:mm a');
      } catch (e) {
      }
    }
    return '';
  }


  static gethhmmA(date: string): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'hh:mm:a');
      } catch (e) {
      }
    }
    return '';
  }

  static getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  static getUTCtoLocalTimestamp(utcTimestamp: number): number {
    if (utcTimestamp) {
      try {
        const localDateTime = addMinutes(utcTimestamp, -(new Date().getTimezoneOffset()));
        return localDateTime.getTime();
      } catch (e) {
      }
    }
    return 0;
  }

  static getYYYYMMDD(date: any): any {
    if (date) {
      try {
        const localDate = Date.parse(date);
        return format(localDate, 'yyyy-MM-dd');
      } catch (e) {
        // console.log("e== ", e);
      }
    }
    return '';
  }

  static getDateAndTime(date: string, formatType?: any): string {
    if (date) {
      try {
        const localDate = Date.parse(date);
        if (formatType) {
          return format(localDate, formatType);
        } else {
          return format(localDate, 'dd-MMM-yyyy hh:mm:a');
        }
      } catch (e) {
      }
    }
    return '';
  }

  static getLastWeek() {
    return subWeeks(new Date(), 1);
  }

  static getStartOfThisMonth() {
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setDate(1);
    today.setHours(0);
    // // console.log(today);
    // const day = today.getDay(),
    //   diff = today.getDate() - day + (day === 0 ? -6 : 0);
    return new Date(today);
  }

  static getEndOfThisMonth() {
    const today = new Date();
    today.setMinutes(23);
    today.setSeconds(0);
    today.setHours(0);
    return new Date(today);
  }

  static getStartOfThisWeek() {
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    const day = today.getDay(),
      diff = today.getDate() - day + (day === 0 ? -6 : 0); // adjust when day is sunday
    return new Date(today.setDate(diff));
  }

  static getStartOfLastWeek() {
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    const day = today.getDay(),
      diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(today.setDate(diff));
  }


  static getLastMonth() {
    return subMonths(new Date(), 1);
  }

  static getLastDay() {
    return subDays(startOfToday(), 1);
  }

  static getEndOfYesterday() {
    return endOfYesterday();
  }

  static getStartofToday() {
    return startOfToday();
  }

  static getEndofToday() {
    return endOfToday();
  }

  static getUtcDateTimeStart(date: any) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcDateToYYYYMMDD(date: any) {
    if (date) {
      try {
        const utcDate = new Date(Date.parse(date));
        return format(utcDate, 'yyyy-MM-dd')
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcDateTimeStart22(date: any) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getLocalDateTimeStart(date: string) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        // const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(utcDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcDateTimeEnd(date: string) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        // const localDate = addMinutes(utcDate, 1440);
        const resultDate = addMinutes(utcDate, new Date().getTimezoneOffset());
        return format(resultDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getDuration(time?: any) {
    if (time >= 60) {
      const hours = Number(Math.trunc(time / 60));

      const mins = Number(Math.trunc(time % 60));
      return hours + 'H ' + ' ' + mins + 'M';
    } else if (time < 60) {
      return (time).toFixed(2) + 'M';
    } else {
      return 0 + 'H ' + 0 + 'M';
    }
  }

  static getHoursFromMinutes(time?: any): any {
    if (time) {
      let hours = (time / 60).toFixed(1);
      return hours;
    }
  }

  static sortDates(dates: any) {
    dates.sort(function (a: any, b: any) {
      let number: any;
      var dateA = +new Date(a);
      var dateB = +new Date(b);
      number = (dateA - dateB);
      return number;
    });


  }

  static DifferenceInYears(date1?: any, date2?: any): any {
    const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
    if (!!date1 && !!date2) {
      let a = new Date(date1);
      let b = new Date(date2 ? date2 : new Date());
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      let timeDiff = Math.floor((utc1 - utc2) / _MS_PER_YEAR);
      return timeDiff;
    }
  }

  /* By Jawwad */
  // input local as '2017-12-04 02:23:56' or any valid parseable date as string
  // out utc as '2017-12-04 07:23:56'  2018-01-01T01:00
  static getUTChhmmsstemp(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, new Date().getTimezoneOffset());
        return format(localDate, 'hh:mm');
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcDateOnly(date: any) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy-MM-dd');
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcDateTime(date: any) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy-MM-dd hh:mm:ss');
      } catch (e) {

      }
    }
    return '';
  }

  static getUtc24DateTimeStart(date: any) {
    if (date) {
      try {
        try {
          const utcDate = Date.parse(date);
          const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
          return format(localDate, 'yyyy-MM-dd HH:mm:SS');
        } catch (e) {
        }
      } catch (e) {

      }
    }
    return '';
  }


  //// convert  Fri Jul 01 2022 00:00:00 GMT+0500 (Pakistan Standard Time) into
  //// 2022-07-21 18:59:59  (UTC 24 hours format) //// (using this functions in violation component)
  static newGetUtc24DateTimeStart(date: any) {
    if (date) {
      try {
        const utcDate = new Date(date);
        var localDate = new Date(utcDate.getTime() + (new Date().getTimezoneOffset() * 60000))
        return format(localDate, 'yyyy-MM-dd HH:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static newGetUtc24DateOnly(date: any) {
    if (date) {
      try {
        const utcDate = new Date(date);
        var localDate = new Date(utcDate.getTime() + (new Date().getTimezoneOffset() * 60000))
        return format(localDate, 'yyyy-MM-dd');
      } catch (e) {
      }
    }
    return '';
  }

  static getUtcMinusDateTimeStart(date: any) {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, (new Date().getTimezoneOffset()));
        return format(localDate, 'yyyy-MM-dd HH:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  static getUTC24Time(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = addMinutes(utcDate, new Date().getTimezoneOffset());
        return format(localDate, 'HH:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }

  // Asad naveed
  static getUTCT(date: string): string {
    if (date) {
      try {
        const utcDate = Date.parse(date);
        const localDate = subMinutes(utcDate, new Date().getTimezoneOffset());
        const localDate2 = addMinutes(utcDate, new Date().getTimezoneOffset());
        // console.log(format(localDate2, 'DD-MM-YYYY, HH:mm:ss'));
        return format(localDate2, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
      }
    }
    return '';
  }
}
