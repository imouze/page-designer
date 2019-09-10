import Observer from './observer';

class Model extends Observer{
    constructor(options){
        super(options);
        this.data = {};
    }

    set(key, value){
        this.data[key] = value;
    }

    get(key){
        return this.data[key];
    }
}

module.exports = Model;
