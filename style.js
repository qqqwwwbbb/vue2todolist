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

    exports.app = new Vue({
        el: '#app',
        data: {
            type: 'all',
            list: JSON.parse(localStorage.getItem('list')) || [],
            todo_new: ''
        },
        computed: {
            leftCount: function() {
                let count = 0;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].status == 0) {
                        count += 1;
                    }
                    if (count >= 3) {
                        console.log("it works.")
                        this.list[i].status = 1;
                    }
                }
                return count;
            },
            filterList: function () {
                return filters[this.type](this.list);
            }
        },
        methods: {
            addTodo: function() {
                let data = {
                    title: this.todo_new,
                    status: 0,
                    time: util.time.getUnix('s')
                };

                this.list.push(data);
                this.todo_new = '';
            },
            toggleTodo: function(index) {
                this.filterList[index].status = (this.filterList[index].status) ? 0: 1;
            },
            removeTodo: function(item) {
                this.list.$remove(item);
            },
            clearCompleted: function() {
                this.list = filters.active(this.list);
            },
            changeType: function(type) {
                this.type = type;


        },
        watch: {
            list: {
                handler: function(list) {
                    localStorage.setItem('list', JSON.stringify(list));
                },
                deep: true
            }
        }
    }
})
})(window);
