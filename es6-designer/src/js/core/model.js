import Observer from './observer';

class Model extends Observer{
    constructor(options){
        super(options);
        this.data = {};
        this.views = [];
    }

    addView(view){
        this.views.push(view);
    }

    removeView(view){
        this.views.forEach((i, v) => {
            if(v === view){
                this.views.splice(i, 1);
            }
        })
    }

    removeAllView(){
        this.views.length = 0;
    }

    getViews(){
        return this.views;
    }

    set(key, value){
        this.data[key] = value;
    }

    get(key){
        return this.data[key];
    }
}

module.exports = Model;
