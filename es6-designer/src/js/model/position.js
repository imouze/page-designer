import Size from './size'
import Origin from './origin'

class Position {
    constructor(){
        this.size = new Size();
        this.origin = new Origin();
    }

    set x(v){
        this.origin.x = v;
    }
    get x(){
        return this.origin.x;
    }
    set y(v){
        this.origin.y = v;
    }
    get y(){
        return this.origin.y;
    }
    set width(w){
        this.size.width = w;
    }
    get width(){
        return this.size.width;
    }
    set height(h){
        this.size.height = h;
    }
    get height(){
        return this.size.height;
    }
}


module.exports = Position;
