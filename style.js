(function(exports) {
    Vue.directive('time', {
        bind: function () {

        },
        update: function (value) {
            let self = this;
            this.el.innerHTML = util.time.getMagic(value);
            this.timeout = setInterval(function () {
                self.el.innerHTML = util.time.getMagic(value);
            }, 60000);
        },
        unbind: function () {
            clearInterval(this.timeout);
        }
    });

    let filters = {
        all: function (list) {
            return list;
        },
        active: function (list) {
            return list.filter(function (todo) {
                return !todo.status;
            });
        },
        completed: function (list) {
            return list.filter(function (todo) {
                return todo.status;
            });
        }
    };
})
