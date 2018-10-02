Vue.component('anchor', {
    template: '#anchor',
    props: [
        'anchorinfo'
    ],
    data: function() {
        return {
            level: anchorInfo.level,
            title: anchorInfo.title
        }
    }
})