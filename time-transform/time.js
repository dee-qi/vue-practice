var Time = {
    getUnix() {
        return (new Date()).getTime();
    },
    getTodayUnix() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    getYearUnix() {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    getStandardDate(timestamp) {
        var date = new Date(timestamp*1000);
        return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
    },
    getFormattedTime(timestampInSeconds) {
        var curTimestamp = (new Date()).getTime()/1000;
        var delt = curTimestamp-timestampInSeconds;
        if(delt < 0) return '无效的时间戳';
        if(delt < 60) return '1分钟以内';
        if(delt >= 60 && delt < 3600) return Math.floor(delt/60) + '分钟前';
        if(delt >= 3600 && delt < 86400) return Math.floor(delt/3600) + '小时前';
        if(delt >= 86400 && delt < 2678400) return Math.floor(delt/86400) + '天前';
        return this.getStandardDate(timestampInSeconds)
    }
}
// console.log(Time.getFormattedTime(1534012492))
Vue.directive('time', {
    bind: function(el, binding) {
        if(binding.expression) {
            var time = binding.value;
            el.innerHTML = `<p>${Time.getFormattedTime(time)}</p>`;
            el._vueTime_ = setInterval(function() {
                el.innerHTML = `<p>${Time.getFormattedTime(time)}</p>`
            }, 60000);
        }
    },
    unbind: function() {
        clearInterval(el._vueTime_);
        delete el._vueTime_;
    }
});