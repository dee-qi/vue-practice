var app = new Vue({
    el: '#app',
    data: {
        show: false
    },
    methods: {
        handleClose() {
            // if(this.show === true) this.show = !this.show;
            this.show = false;
        }
    }
})