(function() {
    let util = {};

    let time = {
        getUnix: function(place) {
            let date = new Date();
            let time_str = date.getTime();
            if (place == 's') {
                return Math.floor(time_str / 1000);
            } else {
                return time_str;
            }
        },
        getToday: function(place) {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();
            let hours = 0;
            let mins = 0;
            let secs = 0;
            let datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
            let tmp_datetime = datetime.replace(/:/g,'-');
            tmp_datetime = tmp_datetime.replace(/ /g,'-');
            let arr = tmp_datetime.split("-");
            let now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
            if (place == 's') {
                return parseInt(now.getTime() / 1000);
            } else {
                return parseInt(now.getTime());
            }
        },
        getYear: function(place) {
            let today = new Date();
            let year = today.getFullYear();
            let month = 0;
            let day = 1;
            let hours = 0;
            let mins = 0;
            let secs = 0;
            let datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
            let tmp_datetime = datetime.replace(/:/g,'-');
            tmp_datetime = tmp_datetime.replace(/ /g,'-');
            let arr = tmp_datetime.split("-");
            let now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
            if (place == 's') {
                return parseInt(now.getTime() / 1000);
            } else {
                return parseInt(now.getTime());
            }
        },
        getLastDate: function(time, type) {
            let unixtime = time * 1000;
            let date = new Date(unixtime);
            let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            if (type == 'month') {
                return month + "-" + currentDate + ' ' + hh + ':' + mm;
                //return month + "-" + currentDate;
            } else {
                return date.getFullYear() + '-' + month + "-" + currentDate + ' ' + hh + ':' + mm;
            }
        },
        getMagic: function(timestamp) {
            let now = this.getUnix('s');
            let today = this.getToday('s');
            let year = this.getYear('s');
            let timer = now - timestamp;
            let tip = '';
            if (timer <= 0) {
                tip = 'Только что';
            } else if (Math.floor(timer/60) <= 0) {
                tip = 'Недавно';
            } else if (timer < 3600) {
                tip = Math.floor(timer/60) + 'Минут назад';
            } else if (timer >= 3600 && (timestamp - today >= 0) ) {
                tip = Math.floor(timer/3600) + 'Час назад';
            } else if (timer/86400 <= 31) {
                tip = Math.ceil(timer/86400) + 'Дней назад';
            } else if (timestamp - today < 0 && (timestamp - year >= 0)) {
                tip = this.getLastDate(timestamp, 'month');
            } else {
                tip = this.getLastDate(timestamp, 'year');
            }
            return tip;
        }
    };

    util.time = time;
    window.util = util;
})();

