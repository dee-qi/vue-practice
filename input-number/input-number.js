function isValueNumber(currentValue) {
    //-?
    // 小数
    // 整数
    // 0 -0
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(currentValue + '');
}

Vue.component('input-number', {
    template: '\
    <div class="input-number">\
        <input type="text" :value="currentValue" @change="handleChange" @keydown.up="handleUp" @keydown.down="handleDown"/>\
        <button @click="handleUp" :disabled="currentValue+step > max">+</button>\
        <button @click="handleDown" :disabled="currentValue-step < min">-</button>\
    </div>\
    ',
    props: {
        //最大值
        max: {
            type: Number,
            default: Infinity
        },
        //最小值
        min: {
            type: Number,
            default: -Infinity
        },
        //初始值
        value: {
            type: Number,
            default: 0
        },
        //每次加减的数值（步伐）
        step: {
            type: Number,
            default: 1
        }
    },
    data: function() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value: function(newVal, oldVal) {
            this.updateValue(newVal);
        },
        currentValue: function(newVal, oldVal) {
            this.$emit('input', newVal);
            this.$emit('on-change', newVal);
        }
    },
    methods: {
        updateValue(newVal) {
            if (newVal > this.max) newVal = this.max;
            if (newVal < this.min) newVal = this.min;
            this.currentValue = newVal;
        },
        handleChange(event) {
            var nowValue = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if(isValueNumber(nowValue)){
                nowValue = Number(nowValue);

                if(nowValue >= max) {
                    nowValue = max;
                }
                if(nowValue <= min) {
                    nowValue = min;
                }

                this.currentValue = nowValue;
                event.target.value = this.currentValue;
            } else {
                event.target.value = this.currentValue;
            }
        },
        handleDown() {
            if(this.currentValue-this.step < this.min) return;
            this.currentValue -= this.step;
        },
        handleUp() {
            if(this.currentValue+this.step > this.max) return;
            this.currentValue += this.step;
        }
    },
    mounted: function() {
        this.updateValue(this.value);
    }
});