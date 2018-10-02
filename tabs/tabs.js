Vue.component('tabs', {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div
                v-for="(item, index) in navList"
                :class="tabCls(item)"
                @click="handleChange(index)">
                {{ item.label }}
            </div>
        </div>
        <div class="tabs-content">
            <!--嵌套pane的地方-->
            <slot></slot>
        </div>
    </div>
    `,
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function() {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': this.currentValue === item.name
                }
            ]
        },
        getTabs() {
            return this.$children.filter(function(item){
                return item.$options.name === 'pane'
            })
        },
        updateNav() {
            this.navList = [];
            // var _this = this;
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                })
                if(!pane.name) pane.name = index;
                if(index == 0) {
                    if(!this.currentValue) this.currentValue = pane.name;
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            tabs.forEach((tab, index) => {
                return tab.show = this.currentValue === tab.name;
            })
        },
        handleChange(index) {
            this.currentValue = this.getTabs()[index].name;
            this.$emit('input', this.currentValue);
            this.$emit('on-change', this.currentValue);
        }
    },
    watch: {
        value(newVal) {
            this.currentValue = newVal;
        },
        currentValue(newVal) {
            this.updateStatus()
        }
    }
})