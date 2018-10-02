Vue.directive('clickoutside', {
    bind: function(el, binding, vnode, oldVnode) {
        function documentHandler(event) {
            console.log('document')
            if(el.contains(event.target)) {
                return false;
            }
            if(binding.expression) {
                binding.value(event);
            }
        }
        document.addEventListener('click', documentHandler);
        el._vueClickOutside_ = documentHandler;
    },
    unbind: function(el, binding) {
        document.removeEventListener('click', el._vueClickOutside_);
        delete el._vueClickOutside_;
    }
})