/**
 * 观察者类
 */
class Observer {
    constructor(){
        this.listeners = {};
    }

    on(name, fn) {
        if (!this.listeners.hasOwnProperty(name)) {
            this.listeners[name] = [];
        }

        if (typeof fn === 'function') {
            this.listeners[name].push(fn);
        }

        return this;
    }

    emit(name, ...args) {
        if (this.listeners.hasOwnProperty(name)) {
            this.listeners[name].forEach((item, key, arr) => {
                item.apply(this, args);
            })
        }

        return this;
    }


    off(name, fn) {
        if (this.listeners.hasOwnProperty(name)) {
            if (fn) {
                this.listeners[name].forEach((item, key, arr) => {
                    if (item === fn) {
                        this.listeners[name].splice(key, 1);
                    }
                })
            } else {
                delete this.listeners[name];
            }
        }
        return this;
    }

    once(name, ...args){
        if(this.listeners.hasOwnProperty(name)){
            this.listeners[name].forEach((item, key, arr) => {
                item.apply(this, args)
                this.off(name, item)
            })
        }

        return this;
    }
}


module.exports = Observer;