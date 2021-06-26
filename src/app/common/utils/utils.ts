import * as moment from "moment";

export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const jsonToQueryString = (json: any) => {
  return '?' +
    Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
}

export const removeArrayItem = (array, index) => {
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const misDateFormatted = (date = "", format = DATE_TIME_FORMAT) => {
  if (date != "") {
    return moment(date).format(format)
  }
  return moment().format(format)
}

export const misTimeToDecimal = (time) => {
  var hoursMinutesSeconds = time.split(/[.:]/);
  var hours = parseInt(hoursMinutesSeconds[0], 10);
  var minutes = hoursMinutesSeconds[1] ? parseInt(hoursMinutesSeconds[1], 10) : 0;
  var seconds = hoursMinutesSeconds[2] ? parseInt(hoursMinutesSeconds[2], 10) : 0;
  return hours + (minutes / 60) + (seconds / (60 * 60));
}

export const misAddToDate = (date = "", period: number, duration, format = DATE_TIME_FORMAT) => {
  if (date != "") {
    return moment(date).add(period, duration).format(format)
  }
  return moment().add(period, duration).format(format)
}